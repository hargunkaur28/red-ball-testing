const SlotBooking = require('../models/SlotBooking');
const { sendCricketSlotReminderSms } = require('./fast2smsService');

const WINDOW_EARLY_MS  = 50 * 60 * 1000;   // regular: send when slot is >= 50 min away
const WINDOW_LATE_MS   = 70 * 60 * 1000;   // regular: send when slot is <= 70 min away
const STARTUP_EARLY_MS =  5 * 60 * 1000;   // startup catch-up: as close as 5 min away
const STARTUP_LATE_MS  = 120 * 60 * 1000;  // startup catch-up: as far as 2 hours away
const POLL_INTERVAL_MS = 15 * 60 * 1000;   // run every 15 minutes
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

// Build slot start as UTC timestamp.
// slotDate is stored as UTC midnight representing the IST calendar date.
// startTime ("HH:MM") is in IST, so we subtract the IST offset to get UTC.
function slotStartUTC(slotDate, hours, minutes) {
  const slotDateIST = new Date(slotDate.getTime() + IST_OFFSET_MS);
  const yyyy = slotDateIST.getUTCFullYear();
  const mm   = slotDateIST.getUTCMonth();
  const dd   = slotDateIST.getUTCDate();
  return Date.UTC(yyyy, mm, dd, hours, minutes, 0) - IST_OFFSET_MS;
}

async function runCricketReminderCron({ earlyMs = WINDOW_EARLY_MS, lateMs = WINDOW_LATE_MS } = {}) {
  try {
    const now = Date.now();

    // Only confirmed bookings for cricket that have not had a reminder sent
    const candidates = await SlotBooking.find({
      $or: [
        { sportSlug: /cricket/i },
        { sportNameSnapshot: /cricket/i },
      ],
      status: { $in: ['confirmed', 'checked-in'] },
      reminderSmsSentAt: { $exists: false },
      playerPhone: { $exists: true, $ne: '' },
    }).populate('slotId', 'date');

    let sent = 0;
    for (const booking of candidates) {
      const slotDate = booking.slotId?.date;
      if (!slotDate) {
        console.log(`[CricketCron] Booking ${booking._id} skipped — slot not found or no date`);
        continue;
      }

      const [hours, minutes] = (booking.startTime || '').split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes)) {
        console.log(`[CricketCron] Booking ${booking._id} skipped — bad startTime "${booking.startTime}"`);
        continue;
      }

      const slotStartMs = slotStartUTC(slotDate, hours, minutes);
      const msUntilSlot = slotStartMs - now;
      const minUntil = Math.round(msUntilSlot / 60000);

      if (msUntilSlot < earlyMs || msUntilSlot > lateMs) {
        console.log(`[CricketCron] Booking ${booking._id} (${booking.startTime}) outside window — ${minUntil} min until slot`);
        continue;
      }

      console.log(`[CricketCron] Sending reminder for booking ${booking._id} — ${booking.startTime}, ${minUntil} min until slot`);

      // Mark attempted before sending to prevent double-fire on slow saves
      booking.reminderSmsAttemptedAt = new Date();
      booking.reminderSmsAttempts = (booking.reminderSmsAttempts || 0) + 1;
      await booking.save().catch(() => {});

      const result = await sendCricketSlotReminderSms(booking);

      if (result?.sent) {
        booking.reminderSmsSentAt = new Date();
        booking.reminderSmsStatus = 'sent';
        sent++;
        console.log(`[CricketCron] Reminder sent for booking ${booking._id}`);
      } else if (result?.skipped) {
        console.log(`[CricketCron] Reminder skipped (SMS disabled/no-key) for booking ${booking._id}`);
      } else {
        booking.reminderSmsStatus = 'failed';
        booking.reminderSmsError = result?.error || 'unknown';
        console.error(`[CricketCron] Reminder FAILED for booking ${booking._id}: ${result?.error || 'unknown'}`);
      }
      await booking.save().catch((e) => console.error('[CricketCron] Save failed:', e.message));
    }

    console.log(`[CricketCron] ${candidates.length} candidates checked, ${sent} reminders sent`);
  } catch (err) {
    console.error('[CricketCron] Error:', err.message);
  }
}

let _interval = null;

function startCricketReminderCron() {
  if (_interval) return;
  console.log('[CricketCron] Started — polling every 15 minutes');

  // Startup catch-up: wide window catches slots in the next 2 hours
  // in case the server was down during the normal 50-70 min window
  runCricketReminderCron({ earlyMs: STARTUP_EARLY_MS, lateMs: STARTUP_LATE_MS });

  _interval = setInterval(() => runCricketReminderCron(), POLL_INTERVAL_MS);
}

function stopCricketReminderCron() {
  if (_interval) { clearInterval(_interval); _interval = null; }
}

module.exports = { startCricketReminderCron, stopCricketReminderCron };
