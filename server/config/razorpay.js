const Razorpay = require('razorpay');
const crypto = require('crypto');

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const razorpayConfig = {
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
  webhook_secret: process.env.RAZORPAY_WEBHOOK_SECRET,
};

// Verify Razorpay webhook signature — must receive the raw request body buffer/string
exports.verifyWebhookSignature = (rawBody, signature) => {
  const hash = crypto
    .createHmac('sha256', razorpayConfig.webhook_secret)
    .update(rawBody)
    .digest('hex');
  return hash === signature;
};

// Verify payment signature (for frontend)
exports.verifyPaymentSignature = (orderId, paymentId, signature) => {
  const body = orderId + '|' + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', razorpayConfig.key_secret)
    .update(body)
    .digest('hex');
  return expectedSignature === signature;
};

// Create Razorpay order
exports.createRazorpayOrder = async (options) => {
  if (!razorpayConfig.key_id || !razorpayConfig.key_secret) {
    throw new Error('Razorpay keys are missing. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET on the server.');
  }
  return new Promise((resolve, reject) => {
    razorpayInstance.orders.create(options, (err, order) => {
      if (err) reject(err);
      else resolve(order);
    });
  });
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchPaymentDetailsOnce = (paymentId) => {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Razorpay payment fetch timed out after 15s')), 15000);
    razorpayInstance.payments.fetch(paymentId, {}, (err, payment) => {
      clearTimeout(timer);
      if (err) reject(err);
      else resolve(payment);
    });
  });
};

// Fetch Razorpay payment details. Razorpay can be briefly eventually-consistent
// immediately after checkout returns, so retry transient fetch failures.
exports.fetchPaymentDetails = async (paymentId, options = {}) => {
  const retries = options.retries ?? 2;
  const delayMs = options.delayMs ?? 900;
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await fetchPaymentDetailsOnce(paymentId);
    } catch (error) {
      lastError = error;
      if (attempt < retries) await sleep(delayMs);
    }
  }

  throw lastError;
};

// Create refund
exports.createRefund = async (paymentId, amount = null) => {
  return new Promise((resolve, reject) => {
    const options = amount ? { amount: amount * 100 } : {};
    razorpayInstance.payments.refund(paymentId, options, (err, refund) => {
      if (err) reject(err);
      else resolve(refund);
    });
  });
};

// Capture payment (for authorized payments)
exports.capturePayment = async (paymentId, amount) => {
  return new Promise((resolve, reject) => {
    razorpayInstance.payments.capture(paymentId, amount * 100, (err, payment) => {
      if (err) reject(err);
      else resolve(payment);
    });
  });
};

module.exports.razorpayInstance = razorpayInstance;
module.exports.razorpayConfig = razorpayConfig;
