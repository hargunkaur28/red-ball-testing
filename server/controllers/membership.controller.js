const MembershipPlan = require('../models/MembershipPlan');
const Membership = require('../models/Membership');
const Payment = require('../models/Payment');
const Admission = require('../models/Admission');
const Attendance = require('../models/Attendance');
const User = require('../models/User');
const { todayISTBoundaries } = require('../utils/istUtils');
const { calculateGST } = require('../utils/gstCalculator');
const { getDurationMs } = require('../utils/dateUtils');
const { verifyPaymentSignature, fetchPaymentDetails, createRazorpayOrder } = require('../config/razorpay');
const { DEFAULT_ALLOWED_DURATION_MINUTES } = require('../utils/sessionCalculator');
const { invalidateEntitlementCache, calculateEntitlement, validateCheckIn } = require('../utils/entitlementEngine');
const { getEffectiveConfig } = require('../utils/sessionCalculator');
const { runTransaction } = require('../utils/transactionHandler');
const jwt = require('jsonwebtoken');
const { sendMembershipWelcomeEmail, sendAdminPaymentAlert } = require('../utils/emailService');
const { buildInvoiceHTML } = require('../utils/invoiceBuilder');

// GET /api/plans
exports.getPlans = async (req, res) => {
  try {
    const plans = await MembershipPlan.find({ isActive: true }).sort({ price: 1 });
    res.json({ plans });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// POST /api/plans
exports.createPlan = async (req, res) => {
  try {
    let requiresSlotBooking = req.body.requiresSlotBooking;
    const sports = (req.body.sportsIncluded || []).map(s => (s || '').trim().toLowerCase());
    const isAll = req.body.isAllServices || sports.some(s => s === 'all' || s === 'all-services');

    if (requiresSlotBooking === undefined) {
      requiresSlotBooking = true;
      if (isAll || (sports.length > 0 && sports.every(s => s === 'gym'))) {
        requiresSlotBooking = false;
      }
    }

    const plan = await MembershipPlan.create({
      ...req.body,
      isAllServices: isAll,
      requiresSlotBooking,
      createdBy: req.user.userId
    });
    res.status(201).json({ plan });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// PUT /api/plans/:id
exports.updatePlan = async (req, res) => {
  try {
    let requiresSlotBooking = req.body.requiresSlotBooking;
    const sports = (req.body.sportsIncluded || []).map(s => (s || '').trim().toLowerCase());
    const isAll = req.body.isAllServices || sports.some(s => s === 'all' || s === 'all-services');

    if (requiresSlotBooking === undefined) {
      requiresSlotBooking = true;
      if (isAll || (sports.length > 0 && sports.every(s => s === 'gym'))) {
        requiresSlotBooking = false;
      }
    }

    const planData = {
      ...req.body,
      isAllServices: isAll,
      requiresSlotBooking
    };

    const plan = await MembershipPlan.findByIdAndUpdate(req.params.id, planData, { new: true });
    if (!plan) return res.status(404).json({ message: 'Plan not found.' });
    res.json({ plan });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// DELETE /api/plans/:id (soft delete)
exports.deletePlan = async (req, res) => {
  try {
    await MembershipPlan.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: 'Plan archived.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// GET /api/memberships/:studentId
exports.getStudentMembership = async (req, res) => {
  try {
    // Only superadmin may view another user's membership
    if (req.user.role !== 'superadmin' && req.params.studentId !== req.user.userId.toString()) {
      return res.status(403).json({ message: 'Access denied.' });
    }

    const memberships = await Membership.find({ studentId: req.params.studentId })
      .populate('planId')
      .populate('paymentId')
      .sort({ createdAt: -1 });

    res.json({
      membership: memberships[0] || null, // For backward compatibility
      memberships: memberships
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// POST /api/memberships/assign
exports.assignMembership = async (req, res) => {
  try {
    const { studentId, planId, paymentMode, name, phone, email } = req.body;
    const plan = await MembershipPlan.findById(planId);
    if (!plan) return res.status(404).json({ message: 'Plan not found.' });

    // 1. Resolve User (create new if studentId is not provided)
    let targetUserId = studentId;
    let user;
    if (!targetUserId) {
      if (!email || !phone || !name) {
        return res.status(400).json({ message: 'Name, email, and phone are required to register a new user.' });
      }
      user = await User.findOne({
        $or: [{ email: email.toLowerCase() }, { phone }],
      });
      if (!user) {
        user = await User.create({
          name,
          email: email.toLowerCase(),
          phone,
          password: 'User@123',
          role: 'user',
        });
      }
      targetUserId = user._id;
    } else {
      user = await User.findById(targetUserId);
      if (!user) return res.status(404).json({ message: 'User not found.' });
    }

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + getDurationMs(plan));
    const isPaidNow = paymentMode && paymentMode !== 'online';

    // 2. Create Payment
    const payment = await Payment.create({
      studentId: targetUserId,
      type: 'membership',
      referenceId: plan._id,
      amount: plan.price,
      gstAmount: 0,
      gstPercent: 0,
      totalAmount: plan.price,
      amountPaid: isPaidNow ? plan.price : 0,
      remainingAmount: isPaidNow ? 0 : plan.price,
      status: isPaidNow ? 'paid' : 'pending',
      paymentMode: isPaidNow ? paymentMode : undefined,
    });

    // 3. Create Membership (active if paid)
    const membership = await Membership.create({
      studentId: targetUserId,
      planId,
      startDate,
      endDate,
      status: isPaidNow ? 'active' : 'pending',
      paymentId: payment._id,
    });

    invalidateEntitlementCache(targetUserId);

    // 4. Send Emails if paid/active
    if (isPaidNow) {
      const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
      const invoiceItems = [{ description: plan.name, quantity: 1, rate: plan.price, amount: plan.price }];

      const invoiceHtml = buildInvoiceHTML({
        invoiceNumber: payment.invoiceNumber,
        date: fmt(payment.createdAt || new Date()),
        studentName: user.name,
        studentPhone: user.phone || '',
        studentEmail: user.email,
        items: invoiceItems,
        subtotal: plan.price,
        gstPercent: 0,
        gstAmount: 0,
        totalAmount: plan.price,
        paymentMode: `Manual (${paymentMode})`,
        paymentId: payment._id.toString(),
        status: 'PAID',
      });

      sendMembershipWelcomeEmail({
        toEmail: user.email,
        toName: user.name,
        planName: plan.name,
        startDate: fmt(membership.startDate),
        endDate: fmt(membership.endDate),
        totalAmount: plan.price,
        invoiceHtml,
        invoiceNumber: payment.invoiceNumber,
      }).catch((err) => console.error('[Assign] Welcome email failed:', err.message));

      sendAdminPaymentAlert({
        adminEmail: process.env.ADMIN_NOTIFICATION_EMAIL,
        payerName: user.name,
        payerEmail: user.email,
        payerPhone: user.phone,
        paymentType: `Membership — ${plan.name} (Manual)`,
        amount: plan.price,
        paymentMode: paymentMode,
        invoiceNumber: payment.invoiceNumber,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      }).catch((err) => console.error('[Assign] Admin alert email failed:', err.message));

      Payment.findByIdAndUpdate(payment._id, { emailSentAt: new Date() }).catch(() => {});
    }

    res.status(201).json({ success: true, membership, payment, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// PUT /api/memberships/:id/renew — RENEWAL WORKFLOW
exports.renewMembership = async (req, res) => {
  try {
    const { paymentMode, amountPaid, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
    const membership = await Membership.findById(req.params.id).populate('planId');
    if (!membership) return res.status(404).json({ message: 'Membership not found.' });

    const plan = membership.planId;
    const price = plan.price;

    // Verify Razorpay signature if provided
    const isRazorpay = paymentMode === 'razorpay' && razorpayOrderId && razorpayPaymentId && razorpaySignature;
    if (isRazorpay) {
      const isValid = verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
      if (!isValid) return res.status(400).json({ message: 'Invalid payment signature.' });
    }

    // Razorpay verified → full payment, else use provided amountPaid
    const parsedAmountPaid = isRazorpay
      ? price
      : (amountPaid !== undefined ? parseFloat(amountPaid) : (paymentMode && paymentMode !== 'online' ? price : 0));
    const remainingAmount = Math.max(0, price - parsedAmountPaid);

    let paymentState = 'pending';
    if (remainingAmount === 0) paymentState = 'paid';
    else if (parsedAmountPaid > 0) paymentState = 'partial';

    const isFullyPaid = paymentState === 'paid';

    // Create renewal payment
    const payment = await Payment.create({
      studentId: membership.studentId,
      type: 'membership',
      referenceId: plan._id,
      amount: price,
      gstAmount: 0,
      gstPercent: 0,
      totalAmount: price,
      amountPaid: Math.min(parsedAmountPaid, price),
      remainingAmount,
      status: paymentState,
      paymentMode: isRazorpay ? 'razorpay' : (paymentMode || 'cash'),
      ...(isRazorpay && { razorpayOrderId, razorpayPaymentId, razorpaySignature }),
    });

    if (isFullyPaid) {
      // Extend from current end date or from now if expired
      const baseDate = membership.endDate > new Date() ? membership.endDate : new Date();
      const newEndDate = new Date(baseDate.getTime() + getDurationMs(plan));

      membership.endDate = newEndDate;
      membership.status = 'active';
      membership.paymentId = payment._id;
      membership.renewalHistory.push({ date: new Date(), planId: plan._id, paymentId: payment._id });
      await membership.save();

      // Update admission payment status
      await Admission.findOneAndUpdate(
        { membershipId: membership._id },
        { paymentStatus: paymentState }
      );
    } else {
      membership.renewalHistory.push({ date: new Date(), planId: plan._id, paymentId: payment._id, note: 'Pending/Partial Payment' });
      await membership.save();
    }

    invalidateEntitlementCache(membership.studentId);

    const io = req.app.get('io');
    if (io) io.emit('dashboard:refresh');

    res.json({ membership, payment });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// PUT /api/memberships/:id/freeze
exports.freezeMembership = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) return res.status(404).json({ message: 'Membership not found.' });

    membership.status = 'frozen';
    membership.frozenAt = new Date();
    await membership.save();

    invalidateEntitlementCache(membership.studentId);

    res.json({ membership });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// PUT /api/memberships/:id/unfreeze
exports.unfreezeMembership = async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) return res.status(404).json({ message: 'Membership not found.' });

    if (membership.frozenAt) {
      const frozenDays = Math.ceil((Date.now() - membership.frozenAt.getTime()) / (1000 * 60 * 60 * 24));
      membership.frozenDays = (membership.frozenDays || 0) + frozenDays;
      membership.endDate = new Date(membership.endDate.getTime() + frozenDays * 24 * 60 * 60 * 1000);
    }

    membership.status = 'active';
    membership.frozenAt = null;
    await membership.save();

    invalidateEntitlementCache(membership.studentId);

    res.json({ membership });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// GET /api/memberships/all — All memberships for admin view
exports.getAllMemberships = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const memberships = await Membership.find(filter)
      .populate('studentId', 'name email phone')
      .populate('planId', 'name duration price sportsIncluded')
      .populate('paymentId', 'invoiceNumber status totalAmount')
      .sort({ createdAt: -1 });

    res.json({ memberships });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// GET /api/memberships/validate/:id
exports.validateMembershipQR = async (req, res) => {
  try {
    const membershipId = req.params.id;
    const membership = await Membership.findById(membershipId)
      .populate('studentId', 'name phone')
      .populate('planId', 'name sports accessAreas');

    if (!membership) {
      return res.status(404).json({ message: 'Invalid QR: Membership not found' });
    }

    if (membership.status !== 'active') {
      return res.status(400).json({ 
        message: `Membership is ${membership.status}. Cannot check-in.`,
        membership 
      });
    }

    // Check if expired based on endDate
    if (new Date(membership.endDate) < new Date()) {
      return res.status(400).json({ 
        message: 'Membership has expired. Please renew.',
        membership 
      });
    }

    const entitlement = await calculateEntitlement(membership.studentId._id);
    const activeSessions = await Attendance.find({
      userId: membership.studentId._id,
      checkOutTime: null,
      sessionStatus: 'Active'
    }).sort({ checkInTime: -1 });

    res.json({
      valid: true,
      membership,
      student: membership.studentId,
      plan: membership.planId,
      entitlement,
      activeSessions
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error validating QR', error: error.message });
  }
};

// POST /api/memberships/:id/check-in
exports.checkInMembership = async (req, res) => {
  try {
    const membershipId = req.params.id;
    const membership = await Membership.findById(membershipId).populate('studentId').populate('planId');

    if (!membership) {
      return res.status(404).json({ message: 'Membership not found.' });
    }

    if (membership.status !== 'active') {
      return res.status(400).json({ message: 'Invalid or inactive membership.' });
    }

    if (new Date(membership.endDate) < new Date()) {
      membership.status = 'expired';
      await membership.save();
      return res.status(400).json({ message: 'Membership has expired. Please renew.' });
    }

    const { startOfDay: today } = todayISTBoundaries();

    const entitlement = await calculateEntitlement(membership.studentId._id);
    if (entitlement.entitlementType === 'none') {
      return res.status(400).json({ message: 'No active entitlement found.' });
    }

    // Determine sport to check into
    const sportToUse = req.body.sport || (entitlement.allowedSports.length > 0 ? entitlement.allowedSports[0] : null);

    if (sportToUse) {
      const validation = await validateCheckIn(membership.studentId._id, sportToUse);
      if (!validation.allowed) {
        return res.status(409).json({ message: validation.reason, attendance: validation.activeSessions[0] });
      }
    } else {
      // Fallback for weird edge cases
      const activeSessions = await Attendance.find({ userId: membership.studentId._id, checkOutTime: null, sessionStatus: 'Active' });
      if (activeSessions.length >= 1) {
        const activeSportName = activeSessions[0]?.sport || 'another sport';
        return res.status(409).json({ message: `You have an active session for ${activeSportName}. Please check out first.`, attendance: activeSessions[0] });
      }
    }

    const config = await getEffectiveConfig(sportToUse);

    // Create attendance record
    const attendance = await Attendance.create({
      userId: membership.studentId._id,
      date: today,
      checkInTime: new Date(),
      status: 'present',
      sessionStatus: 'Active',
      allowedDurationMinutes: config.allowedDurationMinutes,
      feeCollectionStatus: 'Not Applicable',
      checkInMethod: 'membership-id',
      sport: sportToUse || membership.planId?.sportsIncluded?.join(', '),
      entitlementType: entitlement.entitlementType,
      currentSessionConfig: config,
      configVersionSnapshot: config.configVersion || 1,
      sportNameSnapshot: sportToUse || membership.planId?.sportsIncluded?.join(', '),
      membershipPlanSnapshot: membership.planId?.name,
      relatedBookingId: membership._id,
      relatedBookingType: 'membership',
    });

    const { resolveLateMinutesForAttendance } = require('../utils/sessionCalculator');
    attendance.lateMinutes = await resolveLateMinutesForAttendance(attendance);
    await attendance.save();

    const io = req.app.get('io');
    if (io) {
      io.emit('attendance:check-in', {
        userId: membership.studentId._id,
        name: membership.studentId.name,
        membershipId,
        timestamp: attendance.checkInTime,
      });
      io.emit('dashboard:refresh');
    }

    res.json({
      message: 'Check-in successful!',
      attendance,
      membership,
    });

  } catch (error) {
    res.status(500).json({ message: 'Check-in failed.', error: error.message });
  }
};
// --- PUBLIC MEMBERSHIP PORTAL ---

exports.publicPurchaseOrder = async (req, res) => {
  try {
    const { planId, withTraining, sportId, customerDetails } = req.body;
    const plan = await MembershipPlan.findById(planId);

    if (!plan || !plan.isActive) {
      return res.status(404).json({ success: false, message: 'Membership plan not found or inactive.' });
    }

    const trainingAddon = withTraining && plan.trainingAvailable ? (plan.trainingPrice || 0) : 0;

    // Kids Academy: check if admission fee is due for this user
    let admissionFeeAmount = 0;
    let admissionSportId = null;
    if (plan.isKidsAcademy && plan.admissionFeeRequired && plan.admissionFeeAmount > 0 && sportId) {
      const userId = req.user?.userId;
      if (userId) {
        const AcademyAdmission = require('../models/AcademyAdmission');
        const existing = await AcademyAdmission.findOne({ userId, sportId });
        if (!existing || !existing.admissionPaid) {
          admissionFeeAmount = plan.admissionFeeAmount;
          admissionSportId = sportId;
        }
      }
    }

    const totalAmount = plan.price + trainingAddon + admissionFeeAmount;

    // Resolve or pre-create user profile to guarantee payment -> studentId link
    let targetUserId = req.user?.userId;
    let user = null;

    if (!targetUserId && customerDetails?.email) {
      user = await User.findOne({ email: customerDetails.email.toLowerCase() });
      if (!user && customerDetails.phone) {
        user = await User.findOne({ phone: customerDetails.phone });
      }
      if (!user) {
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash('User@123', 10);
        user = await User.create({
          name: customerDetails.name,
          email: customerDetails.email.toLowerCase(),
          phone: customerDetails.phone,
          password: hashedPassword,
          role: 'user',
          isActive: true,
        });
      }
      targetUserId = user._id;
    } else if (targetUserId) {
      user = await User.findById(targetUserId);
    }

    // Create pending Payment BEFORE Razorpay order — snapshot binds verify to plan/training choice
    const pendingPayment = await Payment.create({
      type: 'membership',
      studentId: targetUserId || undefined,
      customerName: user?.name || customerDetails?.name || undefined,
      referenceId: plan._id,
      amount: totalAmount,
      gstAmount: 0,
      gstPercent: 0,
      totalAmount,
      amountPaid: 0,
      remainingAmount: totalAmount,
      status: 'pending',
      paymentMode: 'razorpay',
      withTraining: !!trainingAddon,
      trainingAmount: trainingAddon,
      basePlanAmount: plan.price,
      admissionFeeAmount,
      admissionSportId: admissionSportId || undefined,
    });

    const rzpOrder = await createRazorpayOrder({
      amount: Math.round(totalAmount * 100),
      currency: 'INR',
      receipt: `PUBLIC_MEMB_${Date.now()}`,
      notes: {
        paymentId: pendingPayment._id.toString(),
        planId: plan._id.toString(),
        customerName: user?.name || customerDetails?.name || '',
        customerEmail: user?.email || customerDetails?.email || '',
        customerPhone: user?.phone || customerDetails?.phone || '',
      },
    });

    // Bind Razorpay order ID to the pending payment
    pendingPayment.razorpayOrderId = rzpOrder.id;
    await pendingPayment.save();

    res.json({
      success: true,
      paymentId: pendingPayment._id,
      rzpOrder: {
        id: rzpOrder.id,
        amount: rzpOrder.amount,
        currency: rzpOrder.currency,
      },
      plan,
      withTraining: !!trainingAddon,
      trainingAmount: trainingAddon,
      basePlanAmount: plan.price,
      admissionFeeAmount,
      totalAmount,
    });
  } catch (error) {
    console.error('publicPurchaseOrder error:', error);
    res.status(500).json({ success: false, message: 'Failed to create purchase order.' });
  }
};

exports.publicVerifyPayment = async (req, res) => {
  try {
    const {
      paymentId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      customerDetails = {},
    } = req.body;

    if (!paymentId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ success: false, message: 'paymentId, razorpayOrderId, razorpayPaymentId, razorpaySignature are required.' });
    }

    // Find pending payment by snapshot ID and order ID
    const pendingPayment = await Payment.findOne({ _id: paymentId, razorpayOrderId, type: 'membership' });
    if (!pendingPayment) {
      return res.status(400).json({ success: false, message: 'Payment record not found.' });
    }

    // Idempotency: already paid
    if (pendingPayment.status === 'paid') {
      return res.json({ success: true, message: 'Payment already processed.' });
    }
    if (pendingPayment.status !== 'pending') {
      return res.status(400).json({ success: false, message: `Payment is in an unexpected state: ${pendingPayment.status}.` });
    }

    // Reject conflicting reuse of same order with a different Razorpay payment
    if (pendingPayment.razorpayPaymentId && pendingPayment.razorpayPaymentId !== razorpayPaymentId) {
      return res.status(400).json({ success: false, message: 'This order was already used with a different Razorpay payment.' });
    }

    // Verify signature
    const isValid = verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
    if (!isValid) return res.status(400).json({ success: false, message: 'Invalid payment signature.' });

    // Fetch Razorpay payment and verify captured amount against snapshot — required, no fallback allowed
    let rzpDetails;
    try {
      rzpDetails = await fetchPaymentDetails(razorpayPaymentId);
    } catch (rzpErr) {
      console.error('[Membership] Razorpay fetchPaymentDetails failed:', rzpErr.message, rzpErr.error || '');
      return res.status(502).json({ success: false, message: 'Payment verification unavailable. Please retry in a moment.' });
    }
    if (rzpDetails.status !== 'captured' && rzpDetails.status !== 'authorized') {
      return res.status(400).json({ success: false, message: 'Payment not completed by Razorpay.' });
    }
    if (rzpDetails.amount !== Math.round(pendingPayment.totalAmount * 100)) {
      return res.status(400).json({
        success: false,
        message: `Amount mismatch: expected ₹${pendingPayment.totalAmount}, got ₹${rzpDetails.amount / 100}.`,
      });
    }

    // Load plan from payment snapshot (referenceId = planId) — never trust client planId
    const plan = await MembershipPlan.findById(pendingPayment.referenceId);
    if (!plan) return res.status(404).json({ success: false, message: 'Membership plan not found.' });

    // Match or create user
    let targetUserId = req.user?.userId;
    let user = null;

    if (!targetUserId && customerDetails.email) {
      user = await User.findOne({ email: customerDetails.email.toLowerCase() });
      if (!user && customerDetails.phone) {
        user = await User.findOne({ phone: customerDetails.phone });
      }
      if (!user) {
        const bcrypt = require('bcryptjs');
        const hashedPassword = await bcrypt.hash('User@123', 10);
        user = await User.create({
          name: customerDetails.name,
          email: customerDetails.email.toLowerCase(),
          phone: customerDetails.phone,
          password: hashedPassword,
          role: 'user',
          isActive: true,
        });
      }
      targetUserId = user._id;
    } else if (targetUserId) {
      user = await User.findById(targetUserId);
    }

    if (!user) {
      return res.status(400).json({ success: false, message: 'User identification failed.' });
    }

    // Execute inside a transaction
    const result = await runTransaction(async (session) => {
      const opts = session ? { session } : {};

      let existingMembership = await Membership.findOne({
        studentId: targetUserId,
        planId: plan._id,
      }, null, opts).sort({ createdAt: -1 });

      let startDate = new Date();
      if (existingMembership && existingMembership.status === 'active' && existingMembership.endDate > new Date()) {
        startDate = new Date(existingMembership.endDate);
      }
      const endDate = new Date(startDate.getTime() + getDurationMs(plan));

      // Use snapshot amounts from pendingPayment — do NOT re-derive from client withTraining
      pendingPayment.studentId = targetUserId;
      pendingPayment.customerName = user.name;
      pendingPayment.razorpayPaymentId = razorpayPaymentId;
      pendingPayment.razorpaySignature = razorpaySignature;
      pendingPayment.amountPaid = pendingPayment.totalAmount;
      pendingPayment.remainingAmount = 0;
      pendingPayment.status = 'paid';
      await pendingPayment.save(opts);

      let membershipRec;
      if (existingMembership) {
        existingMembership.startDate = (existingMembership.status === 'active' && existingMembership.endDate > new Date())
          ? existingMembership.startDate
          : new Date();
        existingMembership.endDate = endDate;
        existingMembership.status = 'active';
        existingMembership.paymentId = pendingPayment._id;
        existingMembership.renewalHistory.push({
          date: new Date(),
          planId: plan._id,
          paymentId: pendingPayment._id,
          note: 'Public Online Renewal',
        });
        await existingMembership.save(opts);
        membershipRec = existingMembership;
      } else {
        [membershipRec] = await Membership.create([{
          studentId: targetUserId,
          planId: plan._id,
          startDate,
          endDate,
          status: 'active',
          paymentId: pendingPayment._id,
        }], opts);
      }

      return { payment: pendingPayment, membership: membershipRec };
    });

    // Mark admission as paid if this payment included an admission fee
    if (pendingPayment.admissionFeeAmount > 0 && pendingPayment.admissionSportId) {
      const AcademyAdmission = require('../models/AcademyAdmission');
      await AcademyAdmission.findOneAndUpdate(
        { userId: targetUserId, sportId: pendingPayment.admissionSportId },
        {
          admissionPaid: true,
          paidAt: new Date(),
          paymentId: pendingPayment._id,
          amount: pendingPayment.admissionFeeAmount,
        },
        { upsert: true, new: true }
      );
    }

    let token = null;
    if (!req.user) {
      token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.ACCESS_SECRET || process.env.JWT_SECRET || 'fallback_secret',
        { expiresIn: '30d' }
      );
    }

    invalidateEntitlementCache(targetUserId);

    const payment = result.payment;
    const membership = result.membership;
    const fmt = (d) => new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    // Email uses snapshot values from payment record
    const invoiceItems = [{ description: plan.name, quantity: 1, rate: pendingPayment.basePlanAmount, amount: pendingPayment.basePlanAmount }];
    if (pendingPayment.trainingAmount > 0) {
      invoiceItems.push({ description: 'Training Add-on', quantity: 1, rate: pendingPayment.trainingAmount, amount: pendingPayment.trainingAmount });
    }

    const invoiceHtml = buildInvoiceHTML({
      invoiceNumber: payment.invoiceNumber,
      date: fmt(payment.createdAt || new Date()),
      studentName: user.name,
      studentPhone: user.phone || '',
      studentEmail: user.email,
      items: invoiceItems,
      subtotal: pendingPayment.totalAmount,
      gstPercent: 0,
      gstAmount: 0,
      totalAmount: pendingPayment.totalAmount,
      paymentMode: 'Razorpay (Online)',
      paymentId: razorpayPaymentId,
      status: 'PAID',
    });

    sendMembershipWelcomeEmail({
      toEmail: user.email,
      toName: user.name,
      planName: plan.name + (pendingPayment.trainingAmount > 0 ? ' + Training' : ''),
      startDate: fmt(membership.startDate),
      endDate: fmt(membership.endDate),
      totalAmount: pendingPayment.totalAmount,
      invoiceHtml,
      invoiceNumber: payment.invoiceNumber,
    }).catch((err) => console.error('Welcome email failed:', err.message));

    sendAdminPaymentAlert({
      adminEmail: process.env.ADMIN_NOTIFICATION_EMAIL,
      payerName: user.name,
      payerEmail: user.email,
      payerPhone: user.phone,
      paymentType: `Membership — ${plan.name}`,
      amount: pendingPayment.totalAmount,
      paymentMode: 'Razorpay',
      invoiceNumber: payment.invoiceNumber,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    }).catch((err) => console.error('Admin alert email failed:', err.message));

    Payment.findByIdAndUpdate(payment._id, { emailSentAt: new Date() }).catch(() => {});

    res.json({
      success: true,
      message: 'Membership purchased successfully!',
      membership: result.membership,
      token,
    });
  } catch (error) {
    console.error('publicVerifyPayment error:', error);
    res.status(500).json({ success: false, message: 'Verification failed.', error: error.message });
  }
};
