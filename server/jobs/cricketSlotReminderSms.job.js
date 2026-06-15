/**
 * Cricket Slot Reminder SMS Job
 *
 * Runs every 5 minutes (Asia/Kolkata).
 * Finds confirmed cricket slot bookings that start ~1 hour from now
 * and sends a one-time reminder SMS to the player.
 *
 * Retry policy:
 *   - Max 3 attempts per booking.
 *   - Retry only while the slot is still ≥30 minutes away.
 *   - Once sent (reminderSmsSentAt is set), never retry.
 */

const cron = require('node-cron');
const SlotBooking = require('../models/SlotBooking');
const { sendCricketSlotReminderSms, normalisePhone } = require('../utils/fast2smsService');

const MAX_ATTEMPTS = 3;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Combine a Mongoose Date (slot.date) and a "HH:MM" startTime string
 * into a single Date object in IST.
 * slot.date stored in MongoDB is UTC midnight of the slot date.
 */
function slotStartDate(slotDate, startTime) {
  const [h, m] = (startTime || '00:00').split(':').map(Number);
  // Use the calendar date from slotDate in IST (+05:30 = +330 min)
  const base = new Date(slotDate);
  // Extract IST calendar date
  const istOffset = 5.5 * 60 * 60 * 1000;
  const baseIST = new Date(base.getTime() + istOffset);
  const year  = baseIST.getUTCFullYear();
  const month = baseIST.getUTCMonth();
  const day   = baseIST.getUTCDate();
  // Build UTC Date for IST h:m on that calendar date
  return new Date(Date.UTC(year, month, day, h - 5, m - 30));
}

// ─── Core processor (exported for manual testing) ────────────────────────────

async function processCricketSlotReminders() {
  const now = new Date();
  const windowStart = new Date(now.getTime() + 55 * 60 * 1000); // 55 min from now
  const windowEnd   = new Date(now.getTime() + 65 * 60 * 1000); // 65 min from now
  const cutoffRetry = new Date(now.getTime() + 30 * 60 * 1000); // 30 min — don't retry after this

  // We look at bookings for today and tomorrow to cover timezone edge cases
  const todayIST = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
  const yyyyMmDd = todayIST.toISOString().slice(0, 10);
  const tomorrowIST = new Date(todayIST.getTime() + 24 * 60 * 60 * 1000);
  const yyyyMmDdTomorrow = tomorrowIST.toISOString().slice(0, 10);

  // Date range: from midnight IST today to end of IST tomorrow
  const dateFrom = new Date(yyyyMmDd + 'T00:00:00+05:30');
  const dateTo   = new Date(yyyyMmDdTomorrow + 'T23:59:59+05:30');

  let candidates;
  try {
    candidates = await SlotBooking.find({
      status: { $in: ['confirmed', 'booked', 'paid'] },
      reminderSmsSentAt: { $exists: false },
      $or: [
        { sportSlug: { $regex: /^cricket$/i } },
        { sportNameSnapshot: { $regex: /cricket/i } },
      ],
    })
      .populate({ path: 'slotId', select: 'date startTime endTime courtNameSnapshot' })
      .select('bookingId playerPhone playerName startTime endTime courtNameSnapshot sportNameSnapshot sportSlug slotId reminderSmsSentAt reminderSmsAttempts reminderSmsAttemptedAt')
      .lean();
  } catch (err) {
    console.error('[CricketSMSJob] DB query error:', err.message);
    return;
  }

  if (!candidates || candidates.length === 0) return;

  let processed = 0;
  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const booking of candidates) {
    try {
      // Determine slot date and startTime
      const slotDate  = booking.slotId?.date;
      const startTime = booking.startTime || booking.slotId?.startTime;

      if (!slotDate || !startTime) {
        skipped++;
        continue;
      }

      const slotStart = slotStartDate(slotDate, startTime);

      // Check window: slot must start between 55 and 65 minutes from now
      if (slotStart < windowStart || slotStart > windowEnd) {
        continue;
      }

      processed++;

      // Retry guard — already hit max attempts
      if ((booking.reminderSmsAttempts || 0) >= MAX_ATTEMPTS) {
        console.log(`[CricketSMSJob] Max attempts (${MAX_ATTEMPTS}) reached for ${booking.bookingId}, skipping`);
        skipped++;
        continue;
      }

      // Don't retry if slot is < 30 min away (too late to be useful)
      if (slotStart < cutoffRetry) {
        console.log(`[CricketSMSJob] Slot too close to retry for ${booking.bookingId}, skipping`);
        skipped++;
        continue;
      }

      // Validate phone
      const phone = normalisePhone(booking.playerPhone);
      if (!phone) {
        console.log(`[CricketSMSJob] No valid phone for booking ${booking.bookingId}, skipping`);
        skipped++;
        // Persist so we don't keep iterating on phoneless bookings
        await SlotBooking.updateOne(
          { _id: booking._id },
          {
            $set: { reminderSmsStatus: 'skipped-no-phone', reminderSmsSentAt: new Date() },
          }
        ).catch(() => {});
        continue;
      }

      // Attach court name from slotId if not on booking
      const enriched = {
        ...booking,
        courtNameSnapshot: booking.courtNameSnapshot || booking.slotId?.courtNameSnapshot,
      };

      const result = await sendCricketSlotReminderSms(enriched);

      if (result.sent) {
        await SlotBooking.updateOne(
          { _id: booking._id },
          {
            $set: {
              reminderSmsSentAt: new Date(),
              reminderSmsAttemptedAt: new Date(),
              reminderSmsStatus: 'sent',
              reminderSmsError: null,
            },
            $inc: { reminderSmsAttempts: 1 },
          }
        );
        sent++;
        console.log(`[CricketSMSJob] Reminder sent for booking ${booking.bookingId}`);
      } else if (result.skipped) {
        // SMS disabled globally — stop processing this run silently
        skipped++;
      } else {
        // Failure — increment attempt counter but don't set reminderSmsSentAt so we retry
        await SlotBooking.updateOne(
          { _id: booking._id },
          {
            $set: {
              reminderSmsAttemptedAt: new Date(),
              reminderSmsStatus: 'failed',
              reminderSmsError: result.error || 'unknown',
            },
            $inc: { reminderSmsAttempts: 1 },
          }
        );
        failed++;
        console.warn(`[CricketSMSJob] Reminder failed for booking ${booking.bookingId}: ${result.error}`);
      }
    } catch (err) {
      console.error(`[CricketSMSJob] Error processing booking ${booking.bookingId}:`, err.message);
      failed++;
    }
  }

  if (processed > 0 || sent > 0 || failed > 0) {
    console.log(
      `[CricketSMSJob] Done — in-window: ${processed}, sent: ${sent}, skipped: ${skipped}, failed: ${failed}`
    );
  }
}

// ─── Cron schedule ───────────────────────────────────────────────────────────

function startCricketSlotReminderSms() {
  // Run every 5 minutes, IST timezone
  cron.schedule('*/5 * * * *', async () => {
    try {
      await processCricketSlotReminders();
    } catch (err) {
      console.error('[CricketSMSJob] Unhandled error in cron handler:', err.message);
    }
  }, { timezone: 'Asia/Kolkata' });

  console.log('📱 Cricket slot SMS reminder job scheduled (every 5 min, IST)');
}

module.exports = startCricketSlotReminderSms;
module.exports.processCricketSlotReminders = processCricketSlotReminders;
