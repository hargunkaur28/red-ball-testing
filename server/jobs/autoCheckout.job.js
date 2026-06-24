const cron = require('node-cron');
const Attendance = require('../models/Attendance');
const Sport = require('../models/Sport');
const { applySessionCheckout, getEffectiveConfig } = require('../utils/sessionCalculator');

// Runs every 10 minutes — auto-checkout sessions that have been active past the configured limit
const startAutoCheckout = (io) => {
  cron.schedule('*/10 * * * *', async () => {
    try {
      // Read auto-checkout threshold from DB (falls back to 240 min if not configured)
      const globalConfig = await getEffectiveConfig();
      const autoCheckoutMinutes = globalConfig.autoCheckoutAfterMinutes || 240;
      const cutoff = new Date(Date.now() - autoCheckoutMinutes * 60 * 1000);

      const staleSessions = await Attendance.find({
        checkOutTime: null,
        checkInTime: { $lt: cutoff },
      });

      if (staleSessions.length === 0) return;

      console.log(`🔄 Auto-checkout: Found ${staleSessions.length} stale session(s) older than ${autoCheckoutMinutes}min`);

      for (const session of staleSessions) {
        const sport = session.sport ? await Sport.findOne({ name: session.sport }) : null;
        const { resolveLateMinutesForAttendance } = require('../utils/sessionCalculator');
        const lateMinutes = await resolveLateMinutesForAttendance(session);
        applySessionCheckout(session, {
          checkOutTime: new Date(),
          hourlyPrice: sport?.hourlyPrice || session.hourlyRateAtCheckIn || 0,
          autoClosed: true,
          lateMinutes,
        });
        session.notes = (session.notes || '') + ` [Auto-checkout after ${autoCheckoutMinutes}min inactivity]`;
        await session.save();

        if (session.sport) {
          await Sport.findOneAndUpdate(
            { name: session.sport, activeOccupancy: { $gt: 0 } },
            { $inc: { activeOccupancy: -1 } }
          );
        }
      }

      if (io) {
        io.emit('dashboard:refresh');
        io.emit('attendance:auto-checkout', { count: staleSessions.length, timestamp: new Date() });
        staleSessions
          .filter((s) => (s.lateAmount || 0) > 0)
          .forEach((s) => {
            io.emit('session:overtime', {
              userId: s.userId,
              sport: s.sport,
              attendanceId: s._id,
              overtimeMinutes: s.overtimeMinutes,
              lateAmount: s.lateAmount,
              autoClosed: true,
            });
          });
      }

      console.log(`✅ Auto-checkout: Completed ${staleSessions.length} session(s)`);
    } catch (error) {
      console.error('❌ Auto-checkout job error:', error);
    }
  });
  console.log('⏰ Auto-checkout job scheduled (every 10 min, threshold from DB)');
};

module.exports = startAutoCheckout;
