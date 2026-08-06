const Membership = require('../models/Membership');
const Attendance = require('../models/Attendance');
const Sport = require('../models/Sport');
const { currentISTMinutes } = require('./istUtils');

// ---------------------------------------------------------------------------
// Court membership time bands
// ---------------------------------------------------------------------------

// Court memberships buy a fixed window of the day (Morning / Evening / Happy
// Hours), so a morning member walking in at 8 PM has no entitlement. Booking
// already refuses out-of-band slots; this is the same rule at the door, which
// is what actually gates walk-in sports and front-desk check-ins.
const COURT_BAND_EARLY_GRACE_MINUTES = 5; // matches the slot-entry early window

const timeToMinutes = (hhmm) => {
  const [h, m] = String(hhmm || '').split(':').map(Number);
  return (Number.isFinite(h) ? h : 0) * 60 + (Number.isFinite(m) ? m : 0);
};

const formatBandTime = (hhmm) => {
  const [h, m] = String(hhmm || '').split(':').map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return hhmm;
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`;
};

const planCoversSport = (plan, sportObj) => {
  if (!plan) return false;
  const keys = (plan.sportsIncluded || []).map((k) => (k || '').trim().toLowerCase());
  return keys.some((k) => k === sportObj.slug || k === (sportObj.name || '').toLowerCase());
};

// A band is usable now when we're inside it, allowing a short early arrival.
const bandOpenNow = (band, nowMinutes) =>
  nowMinutes >= timeToMinutes(band.startTime) - COURT_BAND_EARLY_GRACE_MINUTES &&
  nowMinutes < timeToMinutes(band.endTime);

/**
 * Court-band gate for a sport the user is entitled to via membership.
 *
 * Returns null when entry is fine, or a denial reason string. The restriction
 * applies only when EVERY membership covering this sport is a court plan — a
 * regular unlimited membership alongside a court one lifts it, since that
 * membership grants all-day access on its own.
 */
const checkCourtBandAccess = (activeMemberships, sportObj) => {
  const covering = (activeMemberships || []).filter((m) => planCoversSport(m.planId, sportObj));
  if (!covering.length) return null;

  const banded = covering.filter(
    (m) => m.planId?.isCourtMembership && m.planId.courtBand?.startTime && m.planId.courtBand?.endTime,
  );
  // Any non-court coverage (or a court plan with no band configured) means
  // unrestricted access — never lock someone out on malformed plan data.
  if (banded.length !== covering.length) return null;

  const nowMinutes = currentISTMinutes();
  if (banded.some((m) => bandOpenNow(m.planId.courtBand, nowMinutes))) return null;

  const windows = banded
    .map((m) => m.planId.courtBand)
    .map((b) => `${b.label || 'Court'} (${formatBandTime(b.startTime)} – ${formatBandTime(b.endTime)})`)
    .join(', ');

  return `Entry not permitted right now. Your court membership covers ${windows}. Please come back within that window.`;
};

exports.checkCourtBandAccess = checkCourtBandAccess;

// ---------------------------------------------------------------------------
// Per-user entitlement cache (in-memory, 30-second TTL)
// ---------------------------------------------------------------------------
const entitlementCache = new Map();
const ENTITLEMENT_CACHE_TTL = 30 * 1000;

const getCachedEntitlement = (userId) => {
  const key = userId.toString();
  const cached = entitlementCache.get(key);
  if (cached && (Date.now() - cached.time) < ENTITLEMENT_CACHE_TTL) {
    return cached.data;
  }
  return null;
};

const setCachedEntitlement = (userId, data) => {
  entitlementCache.set(userId.toString(), { data, time: Date.now() });
};

/**
 * Invalidate cached entitlement for a specific user, or clear the entire
 * cache when no userId is provided (e.g. after bulk membership changes).
 */
exports.invalidateEntitlementCache = (userId) => {
  if (userId) {
    entitlementCache.delete(userId.toString());
  } else {
    entitlementCache.clear();
  }
};

// ---------------------------------------------------------------------------
// calculateEntitlement
// ---------------------------------------------------------------------------

/**
 * Determine the user's current entitlement based on active memberships.
 *
 * @param {String|ObjectId} userId
 * @returns {Object} entitlement descriptor
 */
const calculateEntitlement = async (userId) => {
  // Check cache first
  const cached = getCachedEntitlement(userId);
  if (cached) return cached;

  const OneTimeAccess = require('../models/OneTimeAccess');

  // 1. Fetch all active, non-expired memberships with their plans
  const memberships = await Membership.find({
    studentId: userId,
    status: 'active',
    endDate: { $gte: new Date() },
  }).populate('planId');

  // 2. Filter out memberships whose plan was deleted or deactivated
  const validMemberships = memberships.filter(
    (m) => m.planId && m.planId.isActive,
  );

  // 3. Collect every sport entry across all plans
  const allSportEntries = [];

  for (const m of validMemberships) {
    for (const entry of m.planId.sportsIncluded || []) {
      allSportEntries.push(entry);
    }
  }

  // 4. Resolve which sport slugs are actually known
  const activeSports = await Sport.find({ active: true, deletedAt: null })
    .select('slug name')
    .lean();

  const knownSlugs = new Set(activeSports.map((s) => s.slug));

  // Normalise collected entries and keep only known sport slugs
  const distinctSports = [
    ...new Set(
      allSportEntries
        .map((e) => (e || '').trim().toLowerCase())
        .filter((slug) => knownSlugs.has(slug)),
    ),
  ];

  // Fetch unexpired unused/active prepaid passes to augment allowed sports
  const passes = await OneTimeAccess.find({
    userId,
    accessStatus: { $in: ['unused', 'active'] },
    expiresAt: { $gt: new Date() }
  }).populate('sportId');

  const passSportSlugs = passes.map(p => p.sportId?.slug).filter(Boolean);

  let entitlementType;
  let concurrentSessionLimit;

  if (distinctSports.length > 0) {
    if (distinctSports.length > 1) {
      entitlementType = 'multi-sport';
      concurrentSessionLimit = distinctSports.length;
    } else {
      entitlementType = 'single-sport';
      concurrentSessionLimit = 1;
    }
  } else if (passSportSlugs.length > 0) {
    entitlementType = 'one-time-play';
    concurrentSessionLimit = 1;
  } else {
    entitlementType = 'none';
    concurrentSessionLimit = 0;
  }

  // Merge pass sport slugs into allowedSports
  const allowedSportsSet = new Set([...distinctSports, ...passSportSlugs]);

  const result = {
    entitlementType,
    concurrentSessionLimit,
    isUnlimited: false,
    allowedSports: Array.from(allowedSportsSet),
    activeMemberships: validMemberships,
  };

  setCachedEntitlement(userId, result);
  return result;
};

exports.calculateEntitlement = calculateEntitlement;

// ---------------------------------------------------------------------------
// validateCheckIn
// ---------------------------------------------------------------------------

/**
 * Validate whether a user is allowed to check in to a given sport.
 * Always queries fresh active sessions (never cached).
 *
 * @param {String|ObjectId} userId
 * @param {String} sportName  – sport slug or display name
 * @param {Object} [options]
 * @param {Boolean} [options.bypassCourtBand] – staff override for a manual
 *        front-desk check-in outside the member's court time band.
 * @returns {Object} { allowed, reason, entitlement, activeSessions }
 */
exports.validateCheckIn = async (userId, sportName, options = {}) => {
  const { bypassCourtBand = false } = options;
  const OneTimeAccess = require('../models/OneTimeAccess');
  const Sport = require('../models/Sport');

  // Normalize sportName to lowercase/trimmed
  const normalizedSportName = (sportName || '').trim().toLowerCase();

  // Find the sport by slug or name
  const sportObj = await Sport.findOne({
    $or: [
      { slug: normalizedSportName },
      { name: { $regex: new RegExp(`^${sportName}$`, 'i') } }
    ],
    deletedAt: null
  });

  if (!sportObj) {
    return {
      allowed: false,
      reason: `Sport ${sportName} not found.`,
      entitlement: null,
      activeSessions: []
    };
  }

  const resolvedSportSlug = sportObj.slug;

  // 1. Calculate entitlement (may come from cache)
  const entitlement = await calculateEntitlement(userId);

  const baseEntitlement = {
    entitlementType: entitlement.entitlementType,
    concurrentSessionLimit: entitlement.concurrentSessionLimit,
    isUnlimited: entitlement.isUnlimited,
    allowedSports: entitlement.allowedSports,
  };

  // Determine source: prepaid pass takes priority over membership so it gets consumed first
  let entitlementSource = 'membership';
  let matchingPass = null;

  // Check for an unused prepaid pass for this sport first
  matchingPass = await OneTimeAccess.findOne({
    userId,
    sportId: sportObj._id,
    accessStatus: 'unused',
    expiresAt: { $gt: new Date() }
  });

  if (matchingPass) {
    entitlementSource = 'one-time-play';
    baseEntitlement.entitlementType = 'one-time-play';
    baseEntitlement.concurrentSessionLimit = 1;
  } else {
    // Fall back to membership coverage
    const hasMembershipCoverage = entitlement.entitlementType !== 'none' &&
      entitlement.allowedSports.includes(resolvedSportSlug) &&
      entitlement.activeMemberships.length > 0;

    if (!hasMembershipCoverage) {
      return {
        allowed: false,
        reason: 'No active membership or unused prepaid pass found. Please purchase entry.',
        entitlement: baseEntitlement,
        activeSessions: [],
      };
    }

    // Court memberships are time-banded — deny entry outside the paid window.
    if (!bypassCourtBand) {
      const bandDenial = checkCourtBandAccess(entitlement.activeMemberships, sportObj);
      if (bandDenial) {
        return {
          allowed: false,
          reason: bandDenial,
          outOfCourtBand: true,
          entitlement: baseEntitlement,
          activeSessions: [],
        };
      }
    }
  }

  // 3. Fetch currently active sessions (checkOutTime is null and sessionStatus is Active)
  const activeSessions = await Attendance.find({ userId, checkOutTime: null, sessionStatus: 'Active' });

  // 4. Duplicate-sport check — user already has an open session for this sport
  const hasDuplicate = activeSessions.some(
    (s) => (s.sport || '').trim().toLowerCase() === resolvedSportSlug || (s.sport || '').trim().toLowerCase() === sportObj.name.toLowerCase(),
  );

  if (hasDuplicate) {
    return {
      allowed: false,
      reason: `You already have an active session for ${sportObj.name}. Please check out first.`,
      entitlement: baseEntitlement,
      activeSessions,
    };
  }

  // 5. Cross-sport active session check — only ONE session at a time
  // If the user has an active session for a DIFFERENT sport, deny access
  if (activeSessions.length > 0) {
    const otherSportSession = activeSessions.find(
      (s) => {
        const sessionSport = (s.sport || '').trim().toLowerCase();
        return sessionSport !== resolvedSportSlug && sessionSport !== sportObj.name.toLowerCase();
      }
    );
    if (otherSportSession) {
      const otherSportName = otherSportSession.sport || 'another sport';
      return {
        allowed: false,
        reason: `You have an active session for ${otherSportName}. Please check out of ${otherSportName} first before checking into ${sportObj.name}.`,
        entitlement: baseEntitlement,
        activeSessions,
      };
    }

    // If the active session count still exceeds 1 (shouldn't normally happen), deny
    if (activeSessions.length >= 1) {
      return {
        allowed: false,
        reason: 'You already have an active session. Please check out before starting another session.',
        entitlement: baseEntitlement,
        activeSessions,
      };
    }
  }

  // 6. Daily Limit Check (Only 1 check-in per day per sport)
  // Bypass for one-time-play checkins only
  if (entitlementSource !== 'one-time-play') {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const previousCheckInsToday = await Attendance.countDocuments({
      userId,
      sport: { $regex: new RegExp(`^${sportObj.name}$`, 'i') },
      checkInTime: { $gte: todayStart, $lte: todayEnd }
    });

    if (previousCheckInsToday >= 1) {
      return {
        allowed: false,
        reason: `Daily limit reached! You have already used your ${sportObj.name} session for today.`,
        entitlement: baseEntitlement,
        activeSessions,
      };
    }
  }

  // 7. All checks passed
  return {
    allowed: true,
    reason: null,
    entitlement: baseEntitlement,
    entitlementSource,
    matchingPass,
    activeSessions,
  };
};
