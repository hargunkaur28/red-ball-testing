const Payment = require('../models/Payment');
const { findConflictingMembership, conflictMessage } = require('../utils/membershipConflict');
const Membership = require('../models/Membership');
const Admission = require('../models/Admission');
const User = require('../models/User');
const MembershipPlan = require('../models/MembershipPlan');
const { getDurationMs } = require('../utils/dateUtils');
const { syncSlotStatus } = require('../utils/slotStatus');
const { calculateGST } = require('../utils/gstCalculator');
const {
  verifyPaymentSignature,
  createRazorpayOrder,
  fetchPaymentDetails,
  createRefund,
  verifyWebhookSignature,
} = require('../config/razorpay');
const { sendMembershipWelcomeEmail, sendAdminPaymentAlert, sendKitchenOrderEmail } = require('../utils/emailService');

// GET /api/payments
exports.getAll = async (req, res) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    else filter.status = { $ne: 'cancelled' };
    
    if (type) filter.type = type;

    // Exclude unpaid/pending restaurant payments (managed in Kitchen portal)
    // Also exclude abandoned online slot-booking checkout records (pending with no booking linked)
    const finalFilter = {
      $and: [
        filter,
        {
          $or: [
            { type: { $ne: 'restaurant' } },
            { type: 'restaurant', status: 'paid' },
          ],
        },
        {
          $or: [
            { type: { $ne: 'slot-booking' } },
            { type: 'slot-booking', status: { $ne: 'pending' } },
            { type: 'slot-booking', status: 'pending', referenceId: { $exists: true, $ne: null } },
          ],
        },
      ],
    };

    const payments = await Payment.find(finalFilter)
      .populate('studentId', 'name email phone')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Payment.countDocuments(filter);

    // Summary stats
    const paidTotal = await Payment.aggregate([
      { 
        $match: { 
          status: { $in: ['paid', 'partial'] },
          $or: [
            { type: { $ne: 'restaurant' } },
            { type: 'restaurant', status: 'paid' }
          ]
        } 
      },
      { $group: { _id: null, total: { $sum: { $ifNull: ['$amountPaid', '$totalAmount'] } } } },
    ]);
    const pendingTotal = await Payment.aggregate([
      { 
        $match: { 
          status: { $in: ['pending', 'partial'] },
          $or: [
            { type: { $ne: 'restaurant' } },
            { type: 'restaurant', status: 'paid' } // This will effectively be 0 for pending, which is correct
          ]
        } 
      },
      { $group: { _id: null, total: { $sum: { $ifNull: ['$remainingAmount', '$totalAmount'] } } } },
    ]);

    res.json({
      payments,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
      paidTotal: paidTotal[0]?.total || 0,
      pendingTotal: pendingTotal[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// POST /api/payments/create-order (Razorpay online payment)
exports.createOrder = async (req, res) => {
  try {
    const { amount, type, studentId, referenceId, customerName, customerEmail, customerPhone, description } = req.body;

    const paymentData = {
      type,
      referenceId,
      customerName,
      amount,
      gstAmount: 0,
      gstPercent: 0,
      totalAmount: amount,
      amountPaid: 0,
      remainingAmount: amount,
      status: 'pending',
      paymentMode: 'razorpay',
    };
    if (studentId) paymentData.studentId = studentId;

    // Create payment record first
    const payment = await Payment.create(paymentData);

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder({
      amount: Math.round(amount * 100), // Amount in paise
      currency: 'INR',
      receipt: `rcpt_${payment._id.toString().slice(-10)}`,
      notes: {
        paymentId: payment._id.toString(),
        type,
      },
    });

    // Store Razorpay order ID in payment record
    payment.razorpayOrderId = razorpayOrder.id;
    await payment.save();

    res.json({
      payment,
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Failed to create order.' });
  }
};

// POST /api/payments/verify — Verify online payment and ACTIVATE everything
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ message: 'razorpayOrderId, razorpayPaymentId, and razorpaySignature are required.' });
    }

    // Find payment record by Razorpay order ID
    const payment = await Payment.findOne({ razorpayOrderId });
    if (!payment) return res.status(404).json({ message: 'Payment not found.' });

    // Idempotency: already fully paid with the same Razorpay payment
    if (payment.status === 'paid') {
      if (payment.razorpayPaymentId === razorpayPaymentId) {
        return res.json({ payment, message: 'Payment already processed.' });
      }
      return res.status(400).json({ message: 'This order was already paid with a different payment ID.' });
    }

    if (payment.status !== 'pending') {
      return res.status(400).json({ message: `Payment is in an unexpected state: ${payment.status}.` });
    }

    // Reject reuse of this order with a different Razorpay payment ID
    if (payment.razorpayPaymentId && payment.razorpayPaymentId !== razorpayPaymentId) {
      return res.status(400).json({ message: 'This order was already used with a different Razorpay payment.' });
    }

    // Verify HMAC signature
    const isValid = verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid payment signature.' });
    }

    // Fetch Razorpay payment details — required, no fallback allowed
    let paymentDetails;
    try {
      paymentDetails = await fetchPaymentDetails(razorpayPaymentId);
    } catch (fetchErr) {
      console.error('Razorpay fetchPaymentDetails failed:', fetchErr.message);
      return res.status(502).json({ message: 'Payment verification unavailable. Please retry in a moment.' });
    }

    if (paymentDetails.status !== 'captured' && paymentDetails.status !== 'authorized') {
      return res.status(400).json({ message: `Payment not completed by Razorpay (status: ${paymentDetails.status}).` });
    }

    // Amount must exactly match the snapshot stored when the order was created
    if (paymentDetails.amount !== Math.round(payment.totalAmount * 100)) {
      return res.status(400).json({
        message: `Payment amount mismatch: expected ₹${payment.totalAmount}, Razorpay received ₹${paymentDetails.amount / 100}.`,
      });
    }

    // All checks passed — mark paid
    payment.razorpayPaymentId = razorpayPaymentId;
    payment.razorpaySignature = razorpaySignature;
    payment.amountPaid = payment.totalAmount;
    payment.remainingAmount = 0;
    payment.status = 'paid';
    await payment.save();

    await activateOnPaymentSuccess(payment, req);

    const io = req.app.get('io');
    if (io) {
      io.emit('payment:success', {
        paymentId: payment._id,
        type: payment.type,
        studentId: payment.studentId,
      });
      io.emit('dashboard:refresh');
    }

    res.json({ payment, message: 'Payment verified and activated successfully.' });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// POST /api/payments/manual — Manual cash/UPI/card payment
exports.manualPayment = async (req, res) => {
  try {
    const { amount, type, studentId, referenceId, paymentMode } = req.body;

    const payment = await Payment.create({
      studentId,
      type,
      referenceId,
      amount,
      gstAmount: 0,
      gstPercent: 0,
      totalAmount: amount,
      amountPaid: amount,
      remainingAmount: 0,
      status: 'paid',
      paymentMode,
    });

    // CRITICAL: Activate related records after manual payment
    await activateOnPaymentSuccess(payment, req);

    res.status(201).json({ payment });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// POST /api/payments/:id/mark-paid — Mark a pending payment as paid or partial
exports.markPaid = async (req, res) => {
  try {
    const { paymentMode, amountPaid, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found.' });

    if (payment.status === 'paid') {
      return res.status(400).json({ message: 'Payment is already fully paid.' });
    }

    // Verify Razorpay signature if provided
    const isRazorpay = paymentMode === 'razorpay' && razorpayOrderId && razorpayPaymentId && razorpaySignature;
    if (isRazorpay) {
      const isValid = verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
      if (!isValid) return res.status(400).json({ message: 'Invalid payment signature.' });
    }

    // Default to paying the remaining amount if amountPaid is not provided, or full remaining if razorpay verified
    const addition = isRazorpay ? payment.remainingAmount : (amountPaid !== undefined ? parseFloat(amountPaid) : payment.remainingAmount);
    const newAmountPaid = (payment.amountPaid || 0) + addition;

    payment.amountPaid = Math.min(newAmountPaid, payment.totalAmount);
    payment.remainingAmount = Math.max(0, payment.totalAmount - payment.amountPaid);
    
    // Treat floating point fractional dust (< 1 Rupee) as fully settled
    if (payment.remainingAmount < 1) {
      payment.remainingAmount = 0;
      payment.amountPaid = payment.totalAmount;
      payment.status = 'paid';
    } else {
      payment.status = 'partial';
    }

    payment.paymentMode = isRazorpay ? 'razorpay' : (paymentMode || payment.paymentMode || 'cash');
    if (isRazorpay) {
      payment.razorpayOrderId = razorpayOrderId;
      payment.razorpayPaymentId = razorpayPaymentId;
      payment.razorpaySignature = razorpaySignature;
    }
    await payment.save();

    // CRITICAL: Activate related records if fully paid
    if (payment.status === 'paid') {
      await activateOnPaymentSuccess(payment, req);
    }

    const io = req.app.get('io');
    if (io) {
      io.emit('dashboard:refresh');
      io.emit('payment:success');
    }

    res.json({ payment, message: `Payment updated. Status: ${payment.status}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// PUT /api/payments/:id/refund
exports.refundPayment = async (req, res) => {
  try {
    const { reason, fullRefund = true } = req.body;
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found.' });

    if (payment.status === 'refunded') {
      return res.status(400).json({ message: 'Payment already refunded.' });
    }

    if (payment.status !== 'paid' && payment.status !== 'partial') {
      return res.status(400).json({ message: 'Only paid/partial payments can be refunded.' });
    }

    // Create refund via Razorpay if payment was via Razorpay
    if (payment.razorpayPaymentId) {
      try {
        const refundAmount = fullRefund ? payment.amountPaid : req.body.refundAmount;
        const refund = await createRefund(payment.razorpayPaymentId, refundAmount);
        payment.razorpayRefundId = refund.id;
      } catch (refundError) {
        console.error('Razorpay refund error:', refundError);
        return res.status(500).json({ message: 'Failed to process refund via Razorpay.' });
      }
    }

    // Update payment status
    payment.status = 'refunded';
    payment.refundReason = reason;
    payment.refundedAt = new Date();
    payment.refundedBy = req.user.userId;
    await payment.save();

    // Deactivate membership if it was a membership payment
    if (payment.type === 'membership') {
      await Membership.findOneAndUpdate(
        { paymentId: payment._id },
        { status: 'cancelled' }
      );
      await Admission.findOneAndUpdate(
        { membershipId: { $exists: true }, studentId: payment.studentId },
        { paymentStatus: 'pending' }
      );
    }

    // Emit socket event
    const io = req.app.get('io');
    if (io) {
      io.emit('payment:refunded', { paymentId: payment._id, reason });
      io.emit('dashboard:refresh');
    }

    res.json({ payment, message: 'Refund processed successfully.' });
  } catch (error) {
    console.error('Refund error:', error);
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

/** Returns true when the authenticated user is allowed to view this payment. */
function canAccessInvoice(payment, user) {
  if (!user) return false;
  if (user.role === 'superadmin') return true;
  // Managers may access restaurant invoices only
  if (user.role === 'manager' && payment.type === 'restaurant') return true;
  // Users may access their own invoices
  const ownerId = payment.studentId?._id ?? payment.studentId;
  if (ownerId && ownerId.toString() === user.userId.toString()) return true;
  return false;
}

// GET /api/payments/:id/invoice (JSON data)
exports.getInvoice = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('studentId', 'name email phone');
    if (!payment) return res.status(404).json({ message: 'Payment not found.' });
    if (!canAccessInvoice(payment, req.user)) {
      return res.status(403).json({ message: 'Access denied.' });
    }
    res.json({ payment });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// GET /api/payments/:id/invoice/print (HTML) — requires auth (set on route)
exports.printInvoice = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('studentId', 'name email phone');
    if (!payment) return res.status(404).send('<h1>Invoice not found</h1>');
    if (!canAccessInvoice(payment, req.user)) {
      return res.status(403).send('<h1>Access denied</h1>');
    }

    const { buildInvoiceHTML } = require('../utils/invoiceBuilder');

    const html = buildInvoiceHTML({
      invoiceNumber: payment.invoiceNumber,
      date: new Date(payment.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      studentName: payment.studentId?.name || 'Walk-in Customer',
      studentPhone: payment.studentId?.phone || '',
      studentEmail: payment.studentId?.email || '',
      items: [{
        description: payment.type === 'membership' ? 'Membership Fee'
          : payment.type === 'one-time-play' ? 'One-Time Play Booking'
          : payment.type === 'restaurant' ? 'Restaurant Order'
          : 'Payment',
        quantity: 1,
        rate: payment.amount,
        amount: payment.amount,
      }],
      subtotal: payment.amount,
      gstPercent: payment.gstPercent || 18,
      gstAmount: payment.gstAmount,
      totalAmount: payment.totalAmount,
      paymentMode: payment.paymentMode,
      paymentId: payment.razorpayPaymentId || payment._id,
      status: payment.status?.toUpperCase(),
    });

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('Invoice render error:', error);
    res.status(500).send('<h1>Error generating invoice</h1>');
  }
};

/**
 * CRITICAL HELPER: Activate all related records when payment succeeds.
 * This is the single source of truth for payment → activation logic.
 */
async function activateOnPaymentSuccess(payment, req) {
  const io = req.app.get('io');

  // Resolve detailed payer details for email alerts
  let payerEmail = '';
  let payerPhone = '';
  let resolvedPayerName = payment.customerName;

  if (payment.studentId) {
    try {
      const user = await User.findById(payment.studentId).select('name email phone');
      if (user) {
        if (!resolvedPayerName) resolvedPayerName = user.name;
        payerEmail = user.email;
        payerPhone = user.phone || '';
      }
    } catch (err) {
      console.error('[Webhook] Failed to resolve payer details:', err.message);
    }
  }

  // Fallback/override for slot booking payload details
  if (payment.type === 'slot-booking' || payment.type === 'one-time-play') {
    const eventData = req?.body?.payload?.payment?.entity;
    const notesEmail = eventData?.notes?.playerEmail || eventData?.email;
    const notesPhone = eventData?.notes?.playerPhone || eventData?.contact;
    const notesName = eventData?.notes?.playerName;
    
    if (notesEmail) payerEmail = notesEmail;
    if (notesPhone) payerPhone = String(notesPhone).replace(/\D/g, '').slice(-10);
    if (notesName) resolvedPayerName = notesName;
  }

  if (payment.type === 'membership') {
    let membership = await Membership.findOneAndUpdate(
      { paymentId: payment._id },
      { status: 'active' },
      { new: true }
    ).populate('planId').populate('studentId', 'name email phone');

    // Webhook fallback: if membership was not created yet (e.g. browser closed), create it now!
    if (!membership && payment.studentId) {
      try {
        const plan = await MembershipPlan.findById(payment.referenceId);
        if (plan) {
          const user = await User.findById(payment.studentId);
          if (user) {
            // Check if user already has a membership for this plan
            let existingMembership = await Membership.findOne({
              studentId: user._id,
              planId: plan._id,
            }).sort({ createdAt: -1 });

            let startDate = new Date();
            if (existingMembership && existingMembership.status === 'active' && existingMembership.endDate > new Date()) {
              startDate = new Date(existingMembership.endDate);
            }
            const endDate = new Date(startDate.getTime() + getDurationMs(plan));

            if (existingMembership) {
              existingMembership.startDate = (existingMembership.status === 'active' && existingMembership.endDate > new Date())
                ? existingMembership.startDate
                : new Date();
              existingMembership.endDate = endDate;
              existingMembership.status = 'active';
              existingMembership.paymentId = payment._id;
              existingMembership.renewalHistory.push({
                date: new Date(),
                planId: plan._id,
                paymentId: payment._id,
                note: 'Webhook Fallback Renewal',
              });
              await existingMembership.save();
              membership = existingMembership;
            } else {
              // One live membership per sport. Same plan is skipped — that is the
              // renewal branch above. A clashing plan means the buyer already holds
              // cover for this sport, so do not mint a second membership here.
              const conflict = await findConflictingMembership(user._id, plan, { ignorePlanId: plan._id });
              if (conflict) {
                console.warn(
                  `[webhook] Skipped duplicate membership for user ${user._id}: ${conflictMessage(conflict)}`
                );
              } else {
                membership = await Membership.create({
                  studentId: user._id,
                  planId: plan._id,
                  startDate,
                  endDate,
                  status: 'active',
                  paymentId: payment._id,
                });
              }
            }

            // Populate fields so welcome email/invoice builders can run
            membership = await Membership.findById(membership._id)
              .populate('planId')
              .populate('studentId', 'name email phone');
          }
        }
      } catch (err) {
        console.error('[Webhook] Failed to auto-create membership:', err.message);
      }
    }

    if (membership) {
      await Admission.findOneAndUpdate(
        { membershipId: membership._id },
        { paymentStatus: 'paid' }
      );

      // Send welcome email with invoice (fire-and-forget)
      if (membership.studentId?.email && !payment.emailSentAt) {
        const { buildInvoiceHTML } = require('../utils/invoiceBuilder');
        const invoiceHtml = buildInvoiceHTML({
          invoiceNumber: payment.invoiceNumber,
          date: new Date(payment.createdAt).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
          }),
          studentName: membership.studentId.name,
          studentPhone: membership.studentId.phone,
          studentEmail: membership.studentId.email,
          items: [{
            description: `Membership: ${membership.planId?.name || 'Plan'}`,
            quantity: 1,
            rate: payment.amount,
            amount: payment.amount,
          }],
          subtotal: payment.amount,
          gstPercent: payment.gstPercent,
          gstAmount: payment.gstAmount,
          totalAmount: payment.totalAmount,
          paymentMode: payment.paymentMode,
          paymentId: payment.razorpayPaymentId || String(payment._id),
          status: 'PAID',
        });

        sendMembershipWelcomeEmail({
          toEmail: membership.studentId.email,
          toName: membership.studentId.name,
          planName: membership.planId?.name || 'Membership',
          startDate: new Date(membership.startDate).toLocaleDateString('en-IN'),
          endDate: new Date(membership.endDate).toLocaleDateString('en-IN'),
          totalAmount: payment.totalAmount,
          invoiceHtml,
          invoiceNumber: payment.invoiceNumber,
        }).catch(console.error);
      }
    }
  }

  if (payment.type === 'restaurant' && payment.referenceId) {
    const Order = require('../models/Order');
    const order = await Order.findByIdAndUpdate(payment.referenceId, {
      paymentStatus: 'paid',
      paymentMethod: 'online'
    }, { new: true }).populate('tableId', 'label tableNumber section');
    
    if (io && order) {
      io.to('restaurant-managers').emit('order:new', { order });
    }

    // Send Kitchen email when the order is paid online
    if (order && process.env.MANAGER_EMAIL) {
      const istTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
      const tableLabel = order.tableId?.label || order.tableId?.tableNumber;
      sendKitchenOrderEmail({
        kitchenEmail: process.env.MANAGER_EMAIL,
        orderNumber: order.orderNumber || order._id.toString().slice(-6).toUpperCase(),
        orderType: order.orderType,
        tableLabel,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        items: order.items,
        subtotal: order.subtotal,
        deliveryCharge: order.deliveryCharge || 0,
        couponCode: order.couponCode,
        couponDiscountAmount: order.couponDiscountAmount || 0,
        totalAmount: order.totalAmount,
        specialInstructions: order.specialInstructions,
        deliveryAddress: order.deliveryAddress,
        timestamp: istTimestamp,
      }).catch((err) => console.error('[Webhook Email] Kitchen order email failed:', err.message));
    }

    // Send Kitchen SMS when the order is paid online
    if (order) {
      const { sendKitchenOrderSms } = require('../utils/fast2smsService');
      sendKitchenOrderSms(order).catch(() => {});
    }
  }

  if (payment.type === 'one-time-play' && payment.referenceId) {
    const SlotBooking = require('../models/SlotBooking');
    const Slot = require('../models/Slot');

    const booking = await SlotBooking.findByIdAndUpdate(payment.referenceId, {
      paymentStatus: 'paid',
      status: 'confirmed',
    }, { new: true });

    if (booking) {
      await Slot.findByIdAndUpdate(booking.slotId, {
        $addToSet: { bookings: booking._id },
        $inc: { currentBookings: 1 },
      });
      await syncSlotStatus(booking.slotId);

      const claimedSlot = await Slot.findById(booking.slotId);
      const Sport = require('../models/Sport');
      const sport = claimedSlot?.sportId ? await Sport.findById(claimedSlot.sportId).select('name') : null;

      // Webhook welcome email fallback for slot booking
      const { sendSlotBookingConfirmationEmail } = require('../utils/emailService');
      if (payerEmail && !payment.emailSentAt) {
        sendSlotBookingConfirmationEmail({
          toEmail: payerEmail,
          toName: resolvedPayerName || 'Player',
          sportName: sport?.name || claimedSlot?.sportSlug || 'Sport',
          courtName: claimedSlot?.courtNameSnapshot,
          date: claimedSlot?.date,
          startTime: claimedSlot?.startTime,
          endTime: claimedSlot?.endTime,
          amountPaid: payment.totalAmount,
          totalAmount: payment.totalAmount,
          paymentStatus: 'paid',
          bookingRef: booking.bookingId,
        }).catch((err) => console.error('[Webhook Email] Slot confirmation failed:', err.message));
      }
    }
  }

  // Webhook fallback for slot order creation / payment.slotId
  if (payment.type === 'slot-booking' && payment.slotId) {
    try {
      const SlotBooking = require('../models/SlotBooking');
      const Slot = require('../models/Slot');
      const Sport = require('../models/Sport');
      const Coupon = require('../models/Coupon');
      const CouponUsage = require('../models/CouponUsage');

      let booking = await SlotBooking.findOne({ paymentId: payment._id });
      if (!booking) {
        const claimedSlot = await Slot.findOneAndUpdate(
          {
            _id: payment.slotId,
            isBookable: true,
            status: { $ne: 'maintenance' },
            $expr: { $lt: ['$currentBookings', '$capacity'] },
          },
          { $inc: { currentBookings: 1 } },
          { new: true }
        );

        if (claimedSlot) {
          await syncSlotStatus(claimedSlot);
          const sport = claimedSlot.sportId ? await Sport.findById(claimedSlot.sportId).select('name slug') : null;
          
          const eventData = req?.body?.payload?.payment?.entity;
          const playerName = eventData?.notes?.playerName || payment.customerName || 'Web Player';
          const playerPhone = eventData?.notes?.playerPhone || (eventData?.contact ? eventData.contact.replace(/\D/g, '').slice(-10) : '0000000000');
          const playerEmail = eventData?.notes?.playerEmail || eventData?.email || '';

          booking = await SlotBooking.create({
            slotId: claimedSlot._id,
            slotName: claimedSlot.name,
            sportId: claimedSlot.sportId,
            sportSlug: claimedSlot.sportSlug || sport?.slug,
            sportNameSnapshot: sport?.name,
            courtId: claimedSlot.courtId,
            courtNameSnapshot: claimedSlot.courtNameSnapshot,
            userId: payment.studentId || undefined,
            bookingType: 'one-time-play',
            playerName,
            playerPhone,
            playerEmail,
            numberOfPlayers: 1,
            startTime: claimedSlot.startTime,
            endTime: claimedSlot.endTime,
            duration: claimedSlot.duration,
            price: payment.totalAmount,
            gstAmount: 0,
            totalAmount: payment.totalAmount,
            status: 'confirmed',
            paymentStatus: 'paid',
            amountDue: 0,
            amountPaid: payment.totalAmount,
            isReference: !!payment.isReference,
            waivedAmount: payment.waivedAmount ?? 0,
            originalAmount: payment.originalAmount,
            discountApplied: payment.discountAmount > 0,
            discountId: payment.discountId || null,
            discountPercent: payment.discountPercent || 0,
            discountAmount: payment.discountAmount || 0,
            paymentId: payment._id,
            ...(payment.couponId && {
              couponId: payment.couponId,
              couponCode: payment.couponCode,
              couponDiscountAmount: payment.couponDiscountAmount,
              finalAmount: payment.totalAmount,
            }),
          });

          payment.referenceId = booking._id;
          if (!payment.customerName) {
            payment.customerName = playerName;
          }
          await payment.save();

          await Slot.findByIdAndUpdate(payment.slotId, { $push: { bookings: booking._id } });

          if (payment.couponId && payment.studentId) {
            try {
              await Coupon.findByIdAndUpdate(payment.couponId, { $inc: { usedCount: 1 } });
              await CouponUsage.create({
                couponId: payment.couponId,
                userId: payment.studentId,
                orderType: 'sports',
                referenceId: booking._id,
                discountAmount: payment.couponDiscountAmount,
                usedAt: new Date(),
              });
            } catch (couponErr) {
              console.error('[Webhook] Coupon usage record error (non-fatal):', couponErr.message);
            }
          }

          // Send confirmation email
          const { sendSlotBookingConfirmationEmail } = require('../utils/emailService');
          if (playerEmail && !payment.emailSentAt) {
            sendSlotBookingConfirmationEmail({
              toEmail: playerEmail,
              toName: playerName,
              sportName: sport?.name || claimedSlot.sportSlug || 'Sport',
              courtName: claimedSlot.courtNameSnapshot,
              date: claimedSlot.date,
              startTime: claimedSlot.startTime,
              endTime: claimedSlot.endTime,
              amountPaid: payment.totalAmount,
              totalAmount: payment.totalAmount,
              paymentStatus: 'paid',
              bookingRef: booking.bookingId,
            }).catch((err) => console.error('[Webhook Email] Slot confirmation failed:', err.message));
          }
        } else {
          console.warn('[Webhook] Slot booking failed because capacity is full. Initiating auto-refund.');
          try {
            if (payment.razorpayPaymentId) {
              await createRefund(payment.razorpayPaymentId, payment.totalAmount);
              payment.status = 'refunded';
            } else {
              payment.status = 'refund-pending';
            }
            payment.adminNote = 'Auto-refund: Slot filled before payment webhook capture';
            await payment.save();
          } catch (refundErr) {
            console.error('[Webhook] Auto-refund failed:', refundErr.message);
            payment.status = 'refund-pending';
            payment.adminNote = `Auto-refund failed: ${refundErr.message}`;
            await payment.save();
          }
        }
      }
    } catch (bookingErr) {
      console.error('[Webhook] Failed to auto-create slot booking:', bookingErr.message);
    }
  }

  // Notify admin of every successful payment (fire-and-forget)
  if (process.env.ADMIN_NOTIFICATION_EMAIL && !payment.emailSentAt) {
    let displayType = payment.type;
    if (payment.type === 'membership') {
      try {
        const plan = await MembershipPlan.findById(payment.referenceId);
        if (plan) {
          displayType = `Membership — ${plan.name}`;
        }
      } catch (_) {}
    }

    sendAdminPaymentAlert({
      adminEmail: process.env.ADMIN_NOTIFICATION_EMAIL,
      payerName: resolvedPayerName || 'Unknown',
      payerEmail: payerEmail,
      payerPhone: payerPhone,
      paymentType: displayType,
      amount: payment.totalAmount,
      paymentMode: payment.paymentMode,
      invoiceNumber: payment.invoiceNumber,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    }).catch(console.error);

    Payment.findByIdAndUpdate(payment._id, { emailSentAt: new Date() }).catch(() => {});
  }

  // Emit realtime updates
  if (io) {
    io.emit('payment:success', {
      paymentId: payment._id,
      studentId: payment.studentId,
      type: payment.type,
      amount: payment.totalAmount,
    });
    io.emit('order:status-update');
    io.emit('dashboard:refresh');
  }
}

// POST /api/payments/webhook/razorpay — Webhook handler for Razorpay events
exports.webhookHandler = async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];

    // Use raw body buffer for HMAC — JSON.stringify(req.body) can differ from the original bytes
    if (!verifyWebhookSignature(req.rawBody, signature)) {
      return res.status(401).json({ message: 'Invalid signature.' });
    }

    const event = req.body.event;
    const eventData = req.body.payload.payment.entity;

    if (event === 'payment.authorized') {
      // Authorized is NOT money in hand — the capture can still fail, and the
      // customer sees "Payment could not be completed" while retrying. Activating
      // here booked slots and marked orders paid for payments that never captured.
      // Do nothing: 'payment.captured' is the only success signal. Deliberately
      // don't store razorpayPaymentId either — a later retry captures under a
      // different payment id, and stashing this one would reject that retry.
      console.log(`[Webhook] payment.authorized ignored (awaiting capture): ${eventData.id}`);
    } else if (event === 'payment.captured') {
      // Payment successful — money actually captured
      const payment = await Payment.findOne({ razorpayOrderId: eventData.order_id });
      if (payment) {
        // Guard against a captured amount that doesn't match what we billed
        if (eventData.amount !== Math.round(payment.totalAmount * 100)) {
          console.error(
            `[Webhook] Amount mismatch for order ${eventData.order_id}: expected ${Math.round(payment.totalAmount * 100)}, got ${eventData.amount}. Not activating.`
          );
          return res.json({ success: true });
        }
        payment.razorpayPaymentId = eventData.id;
        payment.amountPaid = payment.totalAmount;
        payment.remainingAmount = 0;
        payment.status = 'paid';
        await payment.save();
        await activateOnPaymentSuccess(payment, req);
      }
    } else if (event === 'payment.failed') {
      // Payment failed
      const payment = await Payment.findOne({ razorpayOrderId: eventData.order_id });
      if (payment) {
        payment.status = 'failed';
        await payment.save();
        const io = req.app.get('io');
        if (io) io.emit('payment:failed', { paymentId: payment._id });
      }
    } else if (event === 'refund.created' || event === 'refund.processed') {
      // Refund processed
      const payment = await Payment.findOne({ razorpayPaymentId: req.body.payload.refund.entity.payment_id });
      if (payment) {
        payment.status = 'refunded';
        await payment.save();
      }
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: 'Webhook processing error.' });
  }
};

// POST /api/payments/:id/retry — Retry a failed payment
exports.retryPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) return res.status(404).json({ message: 'Payment not found.' });

    // Ownership: superadmin can retry any payment; users only their own
    if (req.user.role !== 'superadmin') {
      const ownerId = payment.studentId?._id ?? payment.studentId;
      if (!ownerId || ownerId.toString() !== req.user.userId.toString()) {
        return res.status(403).json({ message: 'Access denied.' });
      }
    }

    if (payment.status !== 'failed' && payment.status !== 'pending') {
      return res.status(400).json({ message: 'Cannot retry this payment.' });
    }

    // Create a new Razorpay order
    const razorpayOrder = await createRazorpayOrder({
      amount: payment.totalAmount * 100,
      currency: 'INR',
      receipt: payment._id.toString(),
      description: `Retry Payment for ${payment.type}`,
      notes: {
        paymentId: payment._id.toString(),
        type: payment.type,
        retry: true,
      },
    });

    payment.razorpayOrderId = razorpayOrder.id;
    payment.status = 'pending';
    await payment.save();

    res.json({
      payment,
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
    });
  } catch (error) {
    console.error('Retry payment error:', error);
    res.status(500).json({ message: 'Failed to retry payment.' });
  }
};
