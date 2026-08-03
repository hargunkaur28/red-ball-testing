require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const { sendMembershipWelcomeEmail, sendAdminPaymentAlert } = require('../utils/emailService');
const { buildInvoiceHTML } = require('../utils/invoiceBuilder');

// node scripts/testEmail.js [recipient] — defaults to the configured Brevo sender,
// which is always an address you control.
const TEST_RECIPIENT = process.argv[2] || process.env.BREVO_SENDER_EMAIL;

if (!TEST_RECIPIENT) {
  console.error('No recipient. Set BREVO_SENDER_EMAIL in server/.env or pass an address as an argument.');
  process.exit(1);
}

const invoiceHtml = buildInvoiceHTML({
  invoiceNumber: 'INV-TEST-00001',
  date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
  studentName: 'Test User',
  studentPhone: '+91 9999999999',
  studentEmail: TEST_RECIPIENT,
  items: [{ description: 'Gym — Quarterly', quantity: 1, rate: 6000, amount: 6000 }],
  subtotal: 6000,
  gstPercent: 0,
  gstAmount: 0,
  totalAmount: 6000,
  paymentMode: 'Razorpay (Online)',
  paymentId: 'pay_test_123456',
  status: 'PAID',
});

async function run() {
  console.log('Sending welcome email to', TEST_RECIPIENT, '...');
  await sendMembershipWelcomeEmail({
    toEmail: TEST_RECIPIENT,
    toName: 'Test User',
    planName: 'Gym — Quarterly',
    startDate: '24 May 2026',
    endDate: '23 Aug 2026',
    totalAmount: 6000,
    invoiceHtml,
    invoiceNumber: 'INV-TEST-00001',
  });
  console.log('✓ Welcome email sent');

  console.log('Sending admin alert to', process.env.ADMIN_NOTIFICATION_EMAIL, '...');
  await sendAdminPaymentAlert({
    adminEmail: process.env.ADMIN_NOTIFICATION_EMAIL,
    payerName: 'Test User',
    payerEmail: 'testuser@example.com',
    payerPhone: '+91 9999999999',
    paymentType: 'Membership — Gym Quarterly',
    amount: 6000,
    paymentMode: 'Razorpay',
    invoiceNumber: 'INV-TEST-00001',
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  });
  console.log('✓ Admin alert sent');
}

run().catch((err) => {
  console.error('Email test failed:', err.response?.data || err.message);
  process.exit(1);
});
