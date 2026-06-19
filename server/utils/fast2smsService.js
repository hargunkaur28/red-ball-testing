/**
 * Fast2SMS SMS Service
 * Docs: https://docs.fast2sms.com/
 *
 * Routes supported:
 *   q  = Quick Transactional (DLT template required in production)
 *   v  = Voice call
 *   p  = Promotional (not for transactional)
 *
 * Set FAST2SMS_ROUTE=q in .env for DLT transactional.
 * If your Fast2SMS account uses template variables, also set:
 *   FAST2SMS_KITCHEN_ORDER_TEMPLATE_ID
 *   FAST2SMS_CRICKET_REMINDER_TEMPLATE_ID
 */

const axios = require('axios');

const FAST2SMS_URL = 'https://www.fast2sms.com/dev/bulkV2';
const TIMEOUT_MS = 8000;

// ─── Phone normalisation ──────────────────────────────────────────────────────

/**
 * Strip spaces, dashes, +91, 0 prefix and return a clean 10-digit mobile number.
 * Returns null if the number is invalid.
 */
function normalisePhone(raw) {
  if (!raw) return null;
  let n = String(raw).replace(/[\s\-().]/g, '');
  // Strip +91 or 091 prefix
  if (n.startsWith('+91')) n = n.slice(3);
  else if (n.startsWith('091')) n = n.slice(3);
  else if (n.startsWith('91') && n.length === 12) n = n.slice(2);
  // Remove leading 0
  if (n.startsWith('0') && n.length === 11) n = n.slice(1);
  if (/^\d{10}$/.test(n)) return n;
  return null;
}

/** Mask phone for safe logging: 9876543210 → ******3210 */
function maskPhone(phone) {
  if (!phone) return '(none)';
  return '******' + String(phone).slice(-4);
}

/**
 * Parse a comma-separated phone string into an array of valid 10-digit numbers.
 */
function parsePhoneList(raw) {
  if (!raw) return [];
  return raw
    .split(',')
    .map((p) => normalisePhone(p.trim()))
    .filter(Boolean);
}

// ─── Core sender ─────────────────────────────────────────────────────────────

/**
 * Send SMS via Fast2SMS.
 *
 * @param {object} opts
 * @param {string[]} opts.numbers   - Array of valid 10-digit numbers
 * @param {string}   opts.message   - Plain-text message (used when no templateId)
 * @param {string}  [opts.templateId] - DLT template ID (for q-route transactional)
 * @param {string}  [opts.variables]  - Pipe-separated template variables e.g. "123456||OTP"
 *
 * @returns {{ sent: boolean, provider: 'fast2sms', numbers: string[], response?, error? }}
 */
async function sendSms({ numbers, message, templateId, variables }) {
  const apiKey = process.env.FAST2SMS_API_KEY;
  const enabled = process.env.FAST2SMS_ENABLED === 'true';
  const route = process.env.FAST2SMS_ROUTE || 'q';
  const senderId = process.env.FAST2SMS_SENDER_ID;

  if (!enabled) {
    console.log('[SMS] Skipped — FAST2SMS_ENABLED is not "true"');
    return { sent: false, provider: 'fast2sms', numbers, skipped: true, reason: 'disabled' };
  }

  if (!apiKey) {
    console.warn('[SMS] Skipped — FAST2SMS_API_KEY not set');
    return { sent: false, provider: 'fast2sms', numbers, skipped: true, reason: 'no-api-key' };
  }

  if (!numbers || numbers.length === 0) {
    console.warn('[SMS] Skipped — no valid numbers');
    return { sent: false, provider: 'fast2sms', numbers: [], skipped: true, reason: 'no-numbers' };
  }

  const maskedNums = numbers.map(maskPhone).join(', ');

  try {
    const payload = {
      route,
      numbers: numbers.join(','),
    };

    // Template-based (DLT transactional)
    if (templateId) {
      payload.template_id = templateId;
      if (variables) payload.variables_values = variables;
    } else {
      payload.message = message;
    }

    if (senderId) payload.sender_id = senderId;

    const { data } = await axios.post(FAST2SMS_URL, payload, {
      headers: {
        authorization: apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: TIMEOUT_MS,
    });

    if (data?.return === true) {
      console.log(`[SMS] Sent to ${maskedNums} | request_id=${data.request_id}`);
      return { sent: true, provider: 'fast2sms', numbers, response: data };
    }

    // Fast2SMS returned a non-true response
    const errMsg = data?.message?.[0] || JSON.stringify(data);
    console.warn(`[SMS] Fast2SMS returned failure: ${errMsg} | numbers=${maskedNums}`);
    return { sent: false, provider: 'fast2sms', numbers, response: data, error: errMsg };
  } catch (err) {
    const errMsg = err?.response?.data
      ? JSON.stringify(err.response.data)
      : err.message;
    console.error(`[SMS] Error sending to ${maskedNums}: ${errMsg}`);
    return { sent: false, provider: 'fast2sms', numbers, error: errMsg };
  }
}

// ─── Feature 1: Kitchen order SMS ────────────────────────────────────────────

/**
 * Build the kitchen SMS message for a restaurant order.
 * Kept under 160 chars where possible.
 */
function buildKitchenSmsMessage(order) {
  const num = order.orderNumber || order._id?.toString().slice(-6).toUpperCase();
  const amount = `Rs${Math.round(order.totalAmount)}`;
  const type = (order.orderType || 'table').toLowerCase();

  // Build item list: "Chicken Wrap x1, Fries x2" — cap at 3 items then "+ N more"
  const items = order.items || [];
  const MAX_ITEMS = 3;
  const itemParts = items.slice(0, MAX_ITEMS).map((i) => `${i.name} x${i.quantity}`);
  const remaining = items.length - MAX_ITEMS;
  if (remaining > 0) itemParts.push(`+${remaining} more`);
  const itemStr = itemParts.length ? ` | ${itemParts.join(', ')}` : '';

  const remarks = order.specialInstructions ? ` Note:${order.specialInstructions.slice(0, 30)}` : '';
  const coupon = order.couponCode && order.couponDiscountAmount > 0
    ? ` Disc:Rs${Math.round(order.couponDiscountAmount)}`
    : '';

  if (type === 'table') {
    const tableLabel = order.tableId?.label || order.tableId?.tableNumber || 'Table';
    return `New Red Ball order ${num}: ${tableLabel}, ${amount}${coupon}${itemStr}${remarks}. Check Panel.`;
  }

  if (type === 'delivery') {
    const name = order.customerName ? ` for ${order.customerName}` : '';
    return `New Red Ball order ${num}: Delivery${name}, ${amount}${coupon}${itemStr}${remarks}. Check Panel.`;
  }

  // pickup
  const name = order.customerName ? ` for ${order.customerName}` : '';
  return `New Red Ball order ${num}: Pickup${name}, ${amount}${coupon}${itemStr}${remarks}. Check Panel.`;
}

/**
 * Send kitchen order SMS to restaurant manager(s).
 * Fire-and-forget: never throws; saves status on the order document.
 *
 * @param {object} order - Mongoose Order document (may be populated with tableId)
 */
async function sendKitchenOrderSms(order) {
  try {
    console.log(`[SMS] sendKitchenOrderSms called — order=${order.orderNumber || order._id}, method=${order.paymentMethod}, status=${order.paymentStatus}, enabled=${process.env.FAST2SMS_ENABLED}, route=${process.env.FAST2SMS_ROUTE}`);
    // Idempotency guard — never send twice for the same order
    if (order.managerSmsSentAt) {
      console.log(`[SMS] Kitchen SMS already sent for order ${order.orderNumber}, skipping`);
      return;
    }

    const managerNumbers = parsePhoneList(process.env.RESTAURANT_MANAGER_SMS_PHONE);
    if (managerNumbers.length === 0) {
      console.warn('[SMS] RESTAURANT_MANAGER_SMS_PHONE not set or invalid — skipping kitchen SMS');
      return;
    }

    const templateId = process.env.FAST2SMS_KITCHEN_ORDER_TEMPLATE_ID || null;
    const message = buildKitchenSmsMessage(order);

    const result = await sendSms({ numbers: managerNumbers, message, templateId });

    // Persist result on order (non-blocking)
    if (result.sent) {
      order.managerSmsSentAt = new Date();
      order.managerSmsStatus = 'sent';
      console.log(`[SMS] Kitchen SMS sent for order ${order.orderNumber}`);
    } else if (!result.skipped) {
      order.managerSmsStatus = 'failed';
      order.managerSmsError = result.error || 'unknown';
      console.error(`[SMS] Kitchen SMS FAILED for order ${order.orderNumber}:`, result.error || JSON.stringify(result.response));
    }
    await order.save().catch((e) => console.error('[SMS] Could not save managerSmsStatus:', e.message));
  } catch (err) {
    console.error('[SMS] Unexpected error in sendKitchenOrderSms:', err.message);
  }
}

// ─── Feature 2: Cricket slot reminder SMS ────────────────────────────────────

/**
 * Build the cricket reminder SMS message.
 * Kept concise to fit within DLT template expectations.
 */
function buildCricketReminderMessage(booking) {
  const start = booking.startTime || '';
  const end   = booking.endTime   || '';
  const court = booking.courtNameSnapshot || '';

  // Format "16:00" → "4:00 PM"
  function fmtTime(t) {
    if (!t) return '';
    const [h, m] = t.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour   = h % 12 || 12;
    return `${hour}:${String(m).padStart(2, '0')} ${period}`;
  }

  // Format slot date → "today" / "tomorrow" / "12 Jun"
  function fmtDate(rawDate) {
    if (!rawDate) return 'today';
    const slotDay = new Date(rawDate);
    const nowIST  = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
    const slotIST = new Date(slotDay.getTime() + 5.5 * 60 * 60 * 1000);
    const todayStr    = nowIST.toISOString().slice(0, 10);
    const tomorrowStr = new Date(nowIST.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const slotStr     = slotIST.toISOString().slice(0, 10);
    if (slotStr === todayStr)    return 'today';
    if (slotStr === tomorrowStr) return 'tomorrow';
    return slotIST.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' });
  }

  const startFmt = fmtTime(start);
  const endFmt   = fmtTime(end);
  const slotDate = booking.slotId?.date || booking.slotDate;
  const dateStr  = fmtDate(slotDate);
  const timeStr  = startFmt && endFmt ? `${startFmt}-${endFmt}` : startFmt;
  const courtStr = court ? ` at ${court}` : '';

  return `Reminder: Your Cricket slot at Red Ball is ${dateStr} ${timeStr}${courtStr}. Please arrive on time. -Red Ball Academy`;
}

/**
 * Send cricket slot reminder SMS to the player.
 * Fire-and-forget: never throws.
 *
 * @param {object} booking - Mongoose SlotBooking document
 */
async function sendCricketSlotReminderSms(booking) {
  try {
    const phone = normalisePhone(booking.playerPhone);
    if (!phone) {
      console.log(`[SMS] Cricket reminder skipped for booking ${booking.bookingId} — invalid/missing phone ${maskPhone(booking.playerPhone)}`);
      return { sent: false, reason: 'invalid-phone' };
    }

    const templateId = process.env.FAST2SMS_CRICKET_REMINDER_TEMPLATE_ID || null;
    const message = buildCricketReminderMessage(booking);

    return await sendSms({ numbers: [phone], message, templateId });
  } catch (err) {
    console.error('[SMS] Unexpected error in sendCricketSlotReminderSms:', err.message);
    return { sent: false, error: err.message };
  }
}

// ─── Exports ─────────────────────────────────────────────────────────────────

module.exports = {
  sendSms,
  sendKitchenOrderSms,
  sendCricketSlotReminderSms,
  normalisePhone,
  parsePhoneList,
};
