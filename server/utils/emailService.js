const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 587,
  secure: false,
  pool: true,
  maxConnections: 3,
  maxMessages: 100,
  connectionTimeout: 60000,
  greetingTimeout: 60000,
  socketTimeout: 60000,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const getSender = () =>
  `"${process.env.EMAIL_SENDER_NAME || 'Alchemy 360 Academy'}" <${process.env.EMAIL_USER}>`;

const send = ({ to, subject, htmlContent }) =>
  transporter.sendMail({
    from: getSender(),
    to,
    subject,
    html: htmlContent,
  });

async function sendPasswordResetOTP({ toEmail, toName, otp }) {
  return send({
    to: toEmail,
    subject: 'Your Alchemy 360 Academy Password Reset OTP',
    htmlContent: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;">
        <h2 style="color:#DC2626;">Alchemy 360 Academy</h2>
        <p>Hi ${toName},</p>
        <p>Your password reset OTP is:</p>
        <div style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#DC2626;
                    padding:20px;background:#f8f8f8;border-radius:8px;text-align:center;margin:20px 0;">
          ${otp}
        </div>
        <p>This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.</p>
        <p>If you did not request this, please ignore this email.</p>
        <hr/>
        <p style="font-size:12px;color:#999;">Alchemy 360 Box Cricket Academy</p>
      </div>
    `,
  });
}

async function sendFailedLoginAlert({ targetEmail, attemptedEmail, role, attemptCount, ip, userAgent, timestamp }) {
  return send({
    to: targetEmail,
    subject: `Security Alert: ${attemptCount} Failed Login Attempts — ${attemptedEmail}`,
    htmlContent: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;border:2px solid #DC2626;border-radius:8px;padding:24px;">
        <h2 style="color:#DC2626;margin-top:0;">Failed Login Alert</h2>
        <p>There have been <strong>${attemptCount} failed login attempts</strong> on your Alchemy 360 Academy portal.</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <tr><td style="padding:6px 0;color:#666;width:140px;">Account</td><td><strong>${attemptedEmail}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#666;">Role</td><td>${role}</td></tr>
          <tr><td style="padding:6px 0;color:#666;">Attempt Count</td><td><strong>${attemptCount}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#666;">IP Address</td><td>${ip}</td></tr>
          <tr><td style="padding:6px 0;color:#666;">Time (IST)</td><td>${timestamp}</td></tr>
          <tr><td style="padding:6px 0;color:#666;">Browser</td><td style="font-size:12px;">${userAgent}</td></tr>
        </table>
        <p>If this was you, please ignore. If not, consider changing your password immediately.</p>
      </div>
    `,
  });
}

async function sendMembershipWelcomeEmail({ toEmail, toName, planName, startDate, endDate, totalAmount, invoiceHtml, invoiceNumber }) {
  return send({
    to: toEmail,
    subject: `Welcome to Alchemy 360 Academy! Your ${planName} is Active`,
    htmlContent: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#DC2626;color:white;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
          <h1 style="margin:0;">Welcome to Alchemy 360 Academy!</h1>
        </div>
        <div style="padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;">
          <p>Hi <strong>${toName}</strong>,</p>
          <p>Your membership has been activated successfully! Here are your membership details:</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;background:#f8f8f8;border-radius:8px;overflow:hidden;">
            <tr><td style="padding:10px 16px;color:#666;">Plan</td><td style="padding:10px 16px;font-weight:bold;">${planName}</td></tr>
            <tr style="background:white;"><td style="padding:10px 16px;color:#666;">Valid From</td><td style="padding:10px 16px;">${startDate}</td></tr>
            <tr><td style="padding:10px 16px;color:#666;">Valid Until</td><td style="padding:10px 16px;">${endDate}</td></tr>
            <tr style="background:white;"><td style="padding:10px 16px;color:#666;">Amount Paid</td><td style="padding:10px 16px;font-weight:bold;color:#DC2626;">&#8377;${totalAmount}</td></tr>
            <tr><td style="padding:10px 16px;color:#666;">Invoice No.</td><td style="padding:10px 16px;">${invoiceNumber}</td></tr>
          </table>
          <p>Your invoice is included below. Please keep it for your records.</p>
          <p style="margin-top:24px;">See you on the field!</p>
          <p style="color:#DC2626;font-weight:bold;">Team Alchemy 360 Academy</p>
        </div>
        <hr style="margin:32px 0;"/>
        <p style="font-size:11px;color:#999;text-align:center;">Invoice</p>
        ${invoiceHtml}
      </div>
    `,
  });
}

async function sendAdminPaymentAlert({ adminEmail, payerName, payerEmail, payerPhone, paymentType, amount, paymentMode, invoiceNumber, timestamp }) {
  return send({
    to: adminEmail,
    subject: `New Payment Received — &#8377;${amount} (${paymentType})`,
    htmlContent: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;padding:24px;">
        <h2 style="color:#16a34a;margin-top:0;">Payment Received</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:6px 0;color:#666;width:140px;">Amount</td><td><strong style="color:#16a34a;font-size:18px;">&#8377;${amount}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#666;">Payment Type</td><td>${paymentType}</td></tr>
          <tr><td style="padding:6px 0;color:#666;">Payer</td><td>${payerName}</td></tr>
          ${payerEmail ? `<tr><td style="padding:6px 0;color:#666;">Email</td><td>${payerEmail}</td></tr>` : ''}
          ${payerPhone ? `<tr><td style="padding:6px 0;color:#666;">Phone</td><td>${payerPhone}</td></tr>` : ''}
          <tr><td style="padding:6px 0;color:#666;">Payment Mode</td><td>${paymentMode || 'N/A'}</td></tr>
          <tr><td style="padding:6px 0;color:#666;">Invoice No.</td><td>${invoiceNumber || 'N/A'}</td></tr>
          <tr><td style="padding:6px 0;color:#666;">Time (IST)</td><td>${timestamp}</td></tr>
        </table>
      </div>
    `,
  });
}

async function sendOneTimePassUserEmail({ toEmail, toName, sportName, amount, passId, validityHours, timestamp }) {
  return send({
    to: toEmail,
    subject: `Your ${sportName} One-Time Pass is Ready — Alchemy 360 Academy`,
    htmlContent: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
        <div style="background:#DC2626;color:white;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
          <h1 style="margin:0;font-size:22px;">One-Time Pass Confirmed!</h1>
        </div>
        <div style="padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;">
          <p>Hi <strong>${toName}</strong>,</p>
          <p>Your one-time access pass for <strong>${sportName}</strong> has been activated. Show your QR code at the facility entrance to check in.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;background:#f8f8f8;border-radius:8px;overflow:hidden;">
            <tr><td style="padding:10px 16px;color:#666;">Sport</td><td style="padding:10px 16px;font-weight:bold;">${sportName}</td></tr>
            <tr style="background:white;"><td style="padding:10px 16px;color:#666;">Amount Paid</td><td style="padding:10px 16px;font-weight:bold;color:#DC2626;">&#8377;${amount}</td></tr>
            <tr><td style="padding:10px 16px;color:#666;">Pass ID</td><td style="padding:10px 16px;font-size:12px;color:#666;">${passId}</td></tr>
            <tr style="background:white;"><td style="padding:10px 16px;color:#666;">Valid For</td><td style="padding:10px 16px;">${validityHours} hour${validityHours !== 1 ? 's' : ''} from check-in</td></tr>
            <tr><td style="padding:10px 16px;color:#666;">Purchased</td><td style="padding:10px 16px;">${timestamp}</td></tr>
          </table>
          <p style="color:#666;font-size:13px;">Head to your bookings in the app to view your QR code.</p>
          <p style="margin-top:24px;">See you on the field!</p>
          <p style="color:#DC2626;font-weight:bold;">Team Alchemy 360 Academy</p>
        </div>
      </div>
    `,
  });
}

async function sendOrderReadyEmail({ toEmail, toName, orderNumber, orderType, tableLabel, items, totalAmount }) {
  const itemRows = (items || []).map((item) =>
    `<tr>
      <td style="padding:8px 12px;">${item.name}${item.size ? ` (${item.size})` : ''}</td>
      <td style="padding:8px 12px;text-align:center;">${item.quantity}</td>
      <td style="padding:8px 12px;text-align:right;">&#8377;${(item.price * item.quantity).toFixed(0)}</td>
    </tr>`
  ).join('');

  const locationLine = orderType === 'table' && tableLabel
    ? `<tr><td style="padding:8px 12px;color:#666;">Table</td><td style="padding:8px 12px;font-weight:bold;">${tableLabel}</td></tr>`
    : '';

  return send({
    to: toEmail,
    subject: `Order #${orderNumber} is Ready — Alchemy 360 Academy`,
    htmlContent: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;">
        <div style="background:#16a34a;color:white;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
          <h1 style="margin:0;font-size:22px;">Your Order is Ready!</h1>
        </div>
        <div style="padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;">
          <p>Hi <strong>${toName}</strong>,</p>
          <p>Your order is ready${orderType === 'table' ? ' at your table' : ' for pickup'}. Please collect it at the counter.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;background:#f8f8f8;border-radius:8px;overflow:hidden;">
            <tr><td style="padding:8px 12px;color:#666;">Order No.</td><td style="padding:8px 12px;font-weight:bold;">#${orderNumber}</td></tr>
            ${locationLine}
          </table>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;">
            <thead>
              <tr style="background:#f0f0f0;">
                <th style="padding:8px 12px;text-align:left;font-size:13px;">Item</th>
                <th style="padding:8px 12px;text-align:center;font-size:13px;">Qty</th>
                <th style="padding:8px 12px;text-align:right;font-size:13px;">Amount</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
            <tfoot>
              <tr style="border-top:2px solid #e0e0e0;">
                <td colspan="2" style="padding:10px 12px;font-weight:bold;">Total</td>
                <td style="padding:10px 12px;text-align:right;font-weight:bold;color:#DC2626;">&#8377;${totalAmount}</td>
              </tr>
            </tfoot>
          </table>
          <p style="color:#DC2626;font-weight:bold;">Team Alchemy 360 Academy</p>
        </div>
      </div>
    `,
  });
}

async function sendKitchenOrderEmail({ kitchenEmail, orderNumber, orderType, tableLabel, customerName, customerPhone, items, subtotal, deliveryCharge, couponCode, couponDiscountAmount, totalAmount, specialInstructions, deliveryAddress, timestamp }) {
  const itemRows = (items || []).map((item) =>
    `<tr>
      <td style="padding:8px 12px;">${item.name}${item.size ? ` (${item.size})` : ''}</td>
      <td style="padding:8px 12px;text-align:center;">${item.quantity}</td>
      <td style="padding:8px 12px;text-align:right;">&#8377;${(item.price * item.quantity).toFixed(0)}</td>
      ${item.kitchenNote ? `<td style="padding:8px 12px;color:#666;font-size:12px;">${item.kitchenNote}</td>` : '<td></td>'}
    </tr>`
  ).join('');

  const locationSection = orderType === 'table' && tableLabel
    ? `<tr><td style="padding:8px 12px;color:#666;">Table</td><td style="padding:8px 12px;font-weight:bold;">${tableLabel}</td></tr>`
    : orderType === 'delivery' && deliveryAddress
    ? `<tr><td style="padding:8px 12px;color:#666;">Delivery To</td><td style="padding:8px 12px;">${deliveryAddress}</td></tr>`
    : '';

  const couponSection = couponCode && couponDiscountAmount > 0
    ? `<tr style="color:#16a34a;"><td style="padding:8px 12px;">Coupon (${couponCode})</td><td style="padding:8px 12px;text-align:right;">-&#8377;${couponDiscountAmount}</td></tr>`
    : '';

  const deliverySection = deliveryCharge > 0
    ? `<tr><td style="padding:8px 12px;color:#666;">Delivery Charge</td><td style="padding:8px 12px;text-align:right;">&#8377;${deliveryCharge}</td></tr>`
    : '';

  const remarksSection = specialInstructions
    ? `<div style="margin-top:16px;padding:12px 16px;background:#fffbeb;border-left:4px solid #f59e0b;border-radius:4px;">
        <strong style="font-size:13px;">Remarks:</strong> ${specialInstructions}
       </div>`
    : '';

  return send({
    to: kitchenEmail,
    subject: `New Order #${orderNumber} — ${orderType.charAt(0).toUpperCase() + orderType.slice(1)}`,
    htmlContent: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
        <div style="background:#0D0D0D;color:white;padding:20px 24px;border-radius:8px 8px 0 0;">
          <h2 style="margin:0;font-size:20px;">New Order #${orderNumber}</h2>
          <p style="margin:4px 0 0;color:#999;font-size:13px;">${timestamp}</p>
        </div>
        <div style="padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;">
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;background:#f8f8f8;border-radius:8px;overflow:hidden;">
            <tr><td style="padding:8px 12px;color:#666;width:130px;">Order Type</td><td style="padding:8px 12px;font-weight:bold;text-transform:capitalize;">${orderType}</td></tr>
            ${locationSection}
            <tr style="background:white;"><td style="padding:8px 12px;color:#666;">Customer</td><td style="padding:8px 12px;">${customerName || 'Guest'}${customerPhone ? ` &middot; ${customerPhone}` : ''}</td></tr>
          </table>

          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <thead>
              <tr style="background:#f0f0f0;">
                <th style="padding:8px 12px;text-align:left;font-size:13px;">Item</th>
                <th style="padding:8px 12px;text-align:center;font-size:13px;">Qty</th>
                <th style="padding:8px 12px;text-align:right;font-size:13px;">Amount</th>
                <th style="padding:8px 12px;text-align:left;font-size:13px;">Note</th>
              </tr>
            </thead>
            <tbody>${itemRows}</tbody>
          </table>

          <table style="width:100%;border-collapse:collapse;margin-bottom:8px;">
            <tr><td style="padding:6px 12px;color:#666;">Subtotal</td><td style="padding:6px 12px;text-align:right;">&#8377;${subtotal}</td></tr>
            ${deliverySection}
            ${couponSection}
            <tr style="border-top:2px solid #e0e0e0;">
              <td style="padding:10px 12px;font-weight:bold;font-size:16px;">Total Paid</td>
              <td style="padding:10px 12px;text-align:right;font-weight:bold;font-size:16px;color:#DC2626;">&#8377;${totalAmount}</td>
            </tr>
          </table>

          ${remarksSection}
        </div>
      </div>
    `,
  });
}

async function sendSlotBookingConfirmationEmail({ toEmail, toName, sportName, courtName, date, startTime, endTime, amountPaid, totalAmount, paymentStatus, bookingRef }) {
  if (!toEmail) return;

  function fmtTime(t) {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${period}`;
  }

  const dateStr = date
    ? new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })
    : '';

  const statusLabel = paymentStatus === 'paid' ? 'Paid' : paymentStatus === 'partial' ? 'Partially Paid' : 'Pending';
  const statusColor = paymentStatus === 'paid' ? '#16a34a' : '#f59e0b';

  return send({
    to: toEmail,
    subject: `Booking Confirmed — ${sportName} Slot at Alchemy 360 Academy`,
    htmlContent: `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
        <div style="background:#DC2626;color:white;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
          <h1 style="margin:0;font-size:22px;">Slot Booking Confirmed!</h1>
        </div>
        <div style="padding:24px;border:1px solid #e0e0e0;border-top:none;border-radius:0 0 8px 8px;">
          <p>Hi <strong>${toName}</strong>,</p>
          <p>Your slot has been booked successfully at Alchemy 360 Academy.</p>
          <table style="width:100%;border-collapse:collapse;margin:16px 0;background:#f8f8f8;border-radius:8px;overflow:hidden;">
            <tr><td style="padding:10px 16px;color:#666;width:130px;">Sport</td><td style="padding:10px 16px;font-weight:bold;">${sportName}</td></tr>
            ${courtName ? `<tr style="background:white;"><td style="padding:10px 16px;color:#666;">Court</td><td style="padding:10px 16px;">${courtName}</td></tr>` : ''}
            <tr style="background:white;"><td style="padding:10px 16px;color:#666;">Date</td><td style="padding:10px 16px;">${dateStr}</td></tr>
            <tr><td style="padding:10px 16px;color:#666;">Time</td><td style="padding:10px 16px;font-weight:bold;">${fmtTime(startTime)} – ${fmtTime(endTime)}</td></tr>
            <tr style="background:white;"><td style="padding:10px 16px;color:#666;">Total</td><td style="padding:10px 16px;font-weight:bold;color:#DC2626;">&#8377;${totalAmount}</td></tr>
            <tr><td style="padding:10px 16px;color:#666;">Paid</td><td style="padding:10px 16px;">&#8377;${amountPaid}</td></tr>
            <tr style="background:white;"><td style="padding:10px 16px;color:#666;">Status</td><td style="padding:10px 16px;font-weight:bold;color:${statusColor};">${statusLabel}</td></tr>
            ${bookingRef ? `<tr><td style="padding:10px 16px;color:#666;">Ref</td><td style="padding:10px 16px;font-size:12px;color:#888;">${bookingRef}</td></tr>` : ''}
          </table>
          <p style="color:#666;font-size:13px;">Please arrive on time. Show this confirmation at the facility entrance.</p>
          <p style="margin-top:24px;">See you on the field!</p>
          <p style="color:#DC2626;font-weight:bold;">Team Alchemy 360 Academy</p>
        </div>
      </div>
    `,
  });
}

module.exports = {
  sendPasswordResetOTP,
  sendFailedLoginAlert,
  sendMembershipWelcomeEmail,
  sendAdminPaymentAlert,
  sendOneTimePassUserEmail,
  sendOrderReadyEmail,
  sendKitchenOrderEmail,
  sendSlotBookingConfirmationEmail,
};
