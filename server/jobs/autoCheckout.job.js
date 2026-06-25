const cron = require('node-cron');
const Attendance = require('../models/Attendance');
const Sport = require('../models/Sport');
const { applySessionCheckout, getEffectiveConfig } = require('../utils/sessionCalculator');

const resolveSportSlug = (sport) => {
  if (!sport) return null;
  if (typeof sport === 'object') {
    return sport.slug || sport.name?.toLowerCase().replace(/\s+/g, '-') || null;
  }
  if (typeof sport === 'string') {
    return sport.toLowerCase().replace(/\s+/g, '-');
  }
  return null;
};

// Runs every 10 minutes — auto-checkout sessions that have been active past the configured limit
const startAutoCheckout = (io) => {
  cron.schedule('*/10 * * * *', async () => {
    try {
      // Read global auto-checkout threshold from DB (falls back to 240 min if not configured)
      const globalConfig = await getEffectiveConfig();
      const globalDefault = globalConfig?.autoCheckoutAfterMinutes || 240;

      // Find all active sessions
      const activeSessions = await Attendance.find({
        checkOutTime: null,
      });

      if (activeSessions.length === 0) return;

      const staleSessions = [];
      for (const session of activeSessions) {
        // Priority chain:
        // 1. Snapshotted threshold in currentSessionConfig
        // 2. Sport-specific override via getEffectiveConfig
        // 3. Global default config
        // 4. Final hardcoded fallback (240)
        let autoCheckoutMinutes = session.currentSessionConfig?.autoCheckoutAfterMinutes;
        if (autoCheckoutMinutes === undefined || autoCheckoutMinutes === null) {
          const sportSlug = resolveSportSlug(session.sport);
          const config = await getEffectiveConfig(sportSlug);
          autoCheckoutMinutes = config?.autoCheckoutAfterMinutes || globalDefault;
        }

        const cutoff = new Date(Date.now() - autoCheckoutMinutes * 60 * 1000);
        if (new Date(session.checkInTime) < cutoff) {
          staleSessions.push({ session, autoCheckoutMinutes });
        }
      }

      if (staleSessions.length === 0) return;

      console.log(`🔄 Auto-checkout: Found ${staleSessions.length} stale session(s)`);

      for (const { session, autoCheckoutMinutes } of staleSessions) {
        const sport = session.sport
          ? (typeof session.sport === 'object' ? session.sport : await Sport.findOne({ name: session.sport }))
          : null;
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

        const sportName = typeof session.sport === 'object' ? session.sport.name : session.sport;
        if (sportName) {
          await Sport.findOneAndUpdate(
            { name: sportName, activeOccupancy: { $gt: 0 } },
            { $inc: { activeOccupancy: -1 } }
          );
        }
      }

      if (io) {
        io.emit('dashboard:refresh');
        io.emit('attendance:auto-checkout', { count: staleSessions.length, timestamp: new Date() });
        staleSessions
          .map((item) => item.session)
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
  console.log('⏰ Auto-checkout job scheduled (every 10 min, threshold dynamically resolved)');
};

module.exports = startAutoCheckout;
