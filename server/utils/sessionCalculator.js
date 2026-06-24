const SessionConfig = require('../models/SessionConfig');

const ENV_ALLOWED_MINUTES = parseInt(process.env.SESSION_ALLOWED_MINUTES, 10) || 75;

// Legacy constant — kept for backward compatibility with imports
const DEFAULT_ALLOWED_DURATION_MINUTES = ENV_ALLOWED_MINUTES;

// ────────── In-memory config cache (60s TTL) ──────────
let configCache = null;
let configCacheTime = 0;
const CONFIG_CACHE_TTL = 60 * 1000;

const loadConfigs = async () => {
  const now = Date.now();
  if (configCache && (now - configCacheTime) < CONFIG_CACHE_TTL) {
    return configCache;
  }
  try {
    const configs = await SessionConfig.find({}).lean();
    configCache = configs;
    configCacheTime = now;
    return configs;
  } catch (err) {
    // If SessionConfig collection doesn't exist yet (first run), return empty
    return configCache || [];
  }
};

const invalidateConfigCache = () => {
  configCache = null;
  configCacheTime = 0;
};

/**
 * Resolve the effective session configuration for a sport.
 * Merges global defaults with sport-specific overrides.
 * @param {string} [sportSlug] - Sport slug for sport-specific config lookup
 * @returns {Promise<{allowedDurationMinutes: number, overtimeThresholdMinutes: number, lateFeePerMinuteOverride: number|null, autoCheckoutAfterMinutes: number}>}
 */
const getEffectiveConfig = async (sportSlug) => {
  const configs = await loadConfigs();

  const globalConfig = configs.find(c => c.key === 'default') || {
    allowedDurationMinutes: ENV_ALLOWED_MINUTES,
    overtimeThresholdMinutes: 0,
    lateFeePerMinuteOverride: null,
    autoCheckoutAfterMinutes: (parseInt(process.env.AUTO_CHECKOUT_HOURS, 10) || 4) * 60,
    accessValidityHours: 24,
    configVersion: 1,
  };

  if (!sportSlug) return globalConfig;

  const sportConfig = configs.find(
    c => c.type === 'sport' && c.sportSlug === sportSlug.toLowerCase()
  );
  if (!sportConfig) return globalConfig;

  // Sport-specific overrides global (only override non-null values)
  return {
    allowedDurationMinutes: sportConfig.allowedDurationMinutes ?? globalConfig.allowedDurationMinutes,
    overtimeThresholdMinutes: sportConfig.overtimeThresholdMinutes ?? globalConfig.overtimeThresholdMinutes,
    lateFeePerMinuteOverride: sportConfig.lateFeePerMinuteOverride ?? globalConfig.lateFeePerMinuteOverride,
    autoCheckoutAfterMinutes: sportConfig.autoCheckoutAfterMinutes ?? globalConfig.autoCheckoutAfterMinutes,
    accessValidityHours: sportConfig.accessValidityHours ?? globalConfig.accessValidityHours,
    configVersion: sportConfig.configVersion ?? globalConfig.configVersion,
  };
};

// ────────── Session Metrics Calculation ──────────

const roundMoney = (amount) => Math.round((Number(amount || 0) + Number.EPSILON) * 100) / 100;

const calculateSessionMetrics = ({
  checkInTime,
  checkOutTime = new Date(),
  allowedDurationMinutes = DEFAULT_ALLOWED_DURATION_MINUTES,
  overtimeThresholdMinutes = 0,
  hourlyPrice = 0,
  lateFeePerMinuteOverride = null,
  lateMinutes = 0,
}) => {
  const startedAt = new Date(checkInTime);
  const endedAt = new Date(checkOutTime);
  // elapsedMinutes is measured strictly from checkInTime to checkOutTime
  const elapsedMinutes = Math.max(0, Math.ceil((endedAt - startedAt) / (1000 * 60)));
  // actualDurationMinutes includes the elapsed time spent plus any late arrival minutes
  const actualDurationMinutes = elapsedMinutes + (Number(lateMinutes) || 0);

  // Overtime = actual - allowed - grace threshold
  const rawOvertime = actualDurationMinutes - allowedDurationMinutes - overtimeThresholdMinutes;
  const overtimeMinutes = Math.max(0, rawOvertime);

  // Late fee: use override if set, otherwise derive from hourly price
  const lateFeePerMinute = lateFeePerMinuteOverride != null
    ? roundMoney(lateFeePerMinuteOverride)
    : roundMoney((Number(hourlyPrice) || 0) / 60);
  const lateAmount = roundMoney(overtimeMinutes * lateFeePerMinute);

  return {
    allowedDurationMinutes,
    actualDurationMinutes,
    overtimeMinutes,
    overtimeThresholdMinutes,
    lateFeePerMinute,
    lateAmount,
    elapsedMinutes,
    lateMinutes: Number(lateMinutes) || 0,
  };
};

const applySessionCheckout = (attendance, {
  checkOutTime = new Date(),
  hourlyPrice = 0,
  autoClosed = false,
  lateMinutes = 0,
} = {}) => {
  const effectiveLateMinutes = Number(lateMinutes) || Number(attendance.lateMinutes) || 0;

  const metrics = calculateSessionMetrics({
    checkInTime: attendance.checkInTime,
    checkOutTime,
    allowedDurationMinutes: attendance.allowedDurationMinutes || DEFAULT_ALLOWED_DURATION_MINUTES,
    overtimeThresholdMinutes: attendance.overtimeThresholdMinutes || 0,
    hourlyPrice: attendance.hourlyRateAtCheckIn || hourlyPrice,
    lateFeePerMinuteOverride: attendance.currentSessionConfig?.lateFeePerMinute ?? null,
    lateMinutes: effectiveLateMinutes,
  });

  attendance.checkOutTime = checkOutTime;
  attendance.checkedOutAt = checkOutTime;
  attendance.duration = metrics.actualDurationMinutes;
  attendance.actualDurationMinutes = metrics.actualDurationMinutes;
  attendance.allowedDurationMinutes = metrics.allowedDurationMinutes;
  attendance.overtimeMinutes = metrics.overtimeMinutes;
  attendance.lateFeePerMinute = metrics.lateFeePerMinute;
  attendance.lateAmount = metrics.lateAmount;
  attendance.lateMinutes = metrics.lateMinutes;
  attendance.autoClosed = autoClosed;
  attendance.status = metrics.overtimeMinutes > 0 ? 'late' : 'present';
  attendance.sessionStatus = autoClosed
    ? 'Auto Closed'
    : (metrics.overtimeMinutes > 0 ? 'Overtime' : 'Completed');

  if (metrics.lateAmount > 0 && !['Paid', 'Waived'].includes(attendance.feeCollectionStatus)) {
    attendance.feeCollectionStatus = 'Pending Collection';
  } else if (metrics.lateAmount <= 0 && !attendance.feeCollectionStatus) {
    attendance.feeCollectionStatus = 'Not Applicable';
  }

  return metrics;
};

/**
 * Constructs slot start and end dates in standard Date format based on a check-in time and slot string times
 */
const getSlotTimeDates = (checkInTime, startTime, endTime) => {
  if (!checkInTime || !startTime) return null;
  const { IST_OFFSET_MS } = require('./istUtils');
  const checkInIST = new Date(new Date(checkInTime).getTime() + IST_OFFSET_MS);
  const y = checkInIST.getUTCFullYear();
  const m = checkInIST.getUTCMonth();
  const d = checkInIST.getUTCDate();

  const [sh, sm] = startTime.split(':').map(Number);
  const slotStartIST = Date.UTC(y, m, d, sh, sm, 0, 0);
  const slotStartTime = new Date(slotStartIST - IST_OFFSET_MS);

  let slotEndTime = null;
  if (endTime) {
    const [eh, em] = endTime.split(':').map(Number);
    let slotEndIST = Date.UTC(y, m, d, eh, em, 0, 0);
    // Handle slot crossing midnight (e.g. 23:00 to 01:00)
    if (eh < sh || (eh === sh && em < sm)) {
      slotEndIST += 24 * 60 * 60 * 1000;
    }
    slotEndTime = new Date(slotEndIST - IST_OFFSET_MS);
  }

  return { slotStartTime, slotEndTime };
};

/**
 * Resolves lateMinutes for an attendance record at check-in or check-out
 */
const resolveLateMinutesForAttendance = async (attendance) => {
  if (!attendance || !attendance.checkInTime) return 0;

  let startTime = null;
  let endTime = null;

  const SlotBooking = require('../models/SlotBooking');
  const Slot = require('../models/Slot');
  const { IST_OFFSET_MS } = require('./istUtils');

  // 1. Try to resolve slot details from linked slot-booking/membership-slot
  if (['slot-booking', 'membership-slot'].includes(attendance.relatedBookingType) && attendance.relatedBookingId) {
    try {
      const booking = await SlotBooking.findById(attendance.relatedBookingId).select('startTime endTime').lean();
      if (booking) {
        startTime = booking.startTime;
        endTime = booking.endTime;
      }
    } catch (err) {
      console.error('Error resolving booking in resolveLateMinutesForAttendance:', err.message);
    }
  }

  // 2. Walk-in membership or fallback: align check-in time to the hourly block
  if (!startTime) {
    const checkInIST = new Date(new Date(attendance.checkInTime).getTime() + IST_OFFSET_MS);
    const hhmm = `${String(checkInIST.getUTCHours()).padStart(2, '0')}:${String(checkInIST.getUTCMinutes()).padStart(2, '0')}`;

    let slot = null;
    if (attendance.sportId) {
      try {
        const { startOfDay } = require('./istUtils').todayISTBoundaries();
        slot = await Slot.findOne({
          sportId: attendance.sportId,
          date: { $gte: startOfDay },
          startTime: { $lte: hhmm },
          endTime: { $gt: hhmm }
        }).select('startTime endTime').lean();
      } catch (err) {
        console.error('Error finding Slot in resolveLateMinutesForAttendance:', err.message);
      }
    }

    if (slot) {
      startTime = slot.startTime;
      endTime = slot.endTime;
    } else {
      // Round down check-in to start of the hour (explicit walk-in block rounding)
      const h = checkInIST.getUTCHours();
      const startH = String(h).padStart(2, '0');
      const endH = String((h + 1) % 24).padStart(2, '0');
      startTime = `${startH}:00`;
      endTime = `${endH}:00`;
    }
  }

  if (startTime) {
    const checkInTime = new Date(attendance.checkInTime);
    const dates = getSlotTimeDates(checkInTime, startTime, endTime);
    // Explicitly clamp lateMinutes to a minimum of 0 to prevent negative values for early arrivals
    if (dates && checkInTime > dates.slotStartTime) {
      return Math.max(0, Math.ceil((checkInTime - dates.slotStartTime) / (1000 * 60)));
    }
  }

  return 0;
};

/**
 * Dynamically enriches a session record with slot booking details and recalculated metrics.
 * Safely handles missing/deleted slot bookings by falling back to the walk-in hourly block alignment.
 */
const enrichSessionWithSlotAndLateMinutes = async (session) => {
  if (!session) return null;
  const sessionObj = typeof session.toObject === 'function' ? session.toObject() : session;

  let startTime = null;
  let endTime = null;

  const SlotBooking = require('../models/SlotBooking');
  const Slot = require('../models/Slot');
  const { IST_OFFSET_MS } = require('./istUtils');

  // 1. Try resolving booking
  if (['slot-booking', 'membership-slot'].includes(sessionObj.relatedBookingType) && sessionObj.relatedBookingId) {
    try {
      const booking = await SlotBooking.findById(sessionObj.relatedBookingId).select('startTime endTime').lean();
      if (booking) {
        startTime = booking.startTime;
        endTime = booking.endTime;
        sessionObj.slotBooking = booking;
      }
    } catch (err) {
      console.error('Error resolving booking in enrichSessionWithSlotAndLateMinutes:', err.message);
    }
  }

  // 2. Fall back to hourly block alignment (walk-in or missing booking fallback)
  if (!startTime) {
    const checkInIST = new Date(new Date(sessionObj.checkInTime).getTime() + IST_OFFSET_MS);
    const hhmm = `${String(checkInIST.getUTCHours()).padStart(2, '0')}:${String(checkInIST.getUTCMinutes()).padStart(2, '0')}`;

    let slot = null;
    if (sessionObj.sportId) {
      try {
        const { startOfDay } = require('./istUtils').todayISTBoundaries();
        slot = await Slot.findOne({
          sportId: sessionObj.sportId,
          date: { $gte: startOfDay },
          startTime: { $lte: hhmm },
          endTime: { $gt: hhmm }
        }).select('startTime endTime').lean();
      } catch (err) {
        console.error('Error finding Slot in enrichSessionWithSlotAndLateMinutes:', err.message);
      }
    }

    if (slot) {
      startTime = slot.startTime;
      endTime = slot.endTime;
      sessionObj.slotBooking = slot;
    } else {
      // Round down check-in to start of the hour (explicit walk-in block rounding)
      const h = checkInIST.getUTCHours();
      const startH = String(h).padStart(2, '0');
      const endH = String((h + 1) % 24).padStart(2, '0');
      startTime = `${startH}:00`;
      endTime = `${endH}:00`;
      sessionObj.slotBooking = { startTime, endTime };
    }
  }

  // 3. Compute lateMinutes (clamped to >= 0)
  let lateMinutes = sessionObj.lateMinutes || 0;
  if (!sessionObj.lateMinutes && startTime) {
    const checkInTime = new Date(sessionObj.checkInTime);
    const dates = getSlotTimeDates(checkInTime, startTime, endTime);
    if (dates && checkInTime > dates.slotStartTime) {
      lateMinutes = Math.max(0, Math.ceil((checkInTime - dates.slotStartTime) / (1000 * 60)));
    }
  }

  sessionObj.lateMinutes = lateMinutes;

  // 4. Enrich duration and recalculate metrics
  if (sessionObj.checkOutTime) {
    const elapsedMinutes = Math.max(0, Math.ceil((new Date(sessionObj.checkOutTime) - new Date(sessionObj.checkInTime)) / (1000 * 60)));
    sessionObj.elapsedMinutes = elapsedMinutes;

    const metrics = calculateSessionMetrics({
      checkInTime: sessionObj.checkInTime,
      checkOutTime: sessionObj.checkOutTime,
      allowedDurationMinutes: sessionObj.allowedDurationMinutes || DEFAULT_ALLOWED_DURATION_MINUTES,
      overtimeThresholdMinutes: sessionObj.overtimeThresholdMinutes || 0,
      hourlyPrice: sessionObj.hourlyRateAtCheckIn || 0,
      lateFeePerMinuteOverride: sessionObj.currentSessionConfig?.lateFeePerMinute ?? null,
      lateMinutes: sessionObj.lateMinutes,
    });

    sessionObj.actualDurationMinutes = metrics.actualDurationMinutes;
    sessionObj.duration = metrics.actualDurationMinutes;
    sessionObj.overtimeMinutes = metrics.overtimeMinutes;
    sessionObj.lateAmount = metrics.lateAmount;
  } else {
    const elapsedMinutes = Math.max(0, Math.floor((Date.now() - new Date(sessionObj.checkInTime).getTime()) / 60000));
    sessionObj.elapsedMinutes = elapsedMinutes;
  }

  return sessionObj;
};

module.exports = {
  DEFAULT_ALLOWED_DURATION_MINUTES,
  getEffectiveConfig,
  invalidateConfigCache,
  calculateSessionMetrics,
  applySessionCheckout,
  getSlotTimeDates,
  resolveLateMinutesForAttendance,
  enrichSessionWithSlotAndLateMinutes,
};
