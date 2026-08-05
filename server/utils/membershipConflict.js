const Membership = require('../models/Membership');

// A member may hold only ONE live membership per sport. Buying "Badminton Monthly"
// while "Badminton Yearly" is still running is a duplicate, and so is buying a combo
// that overlaps a sport an existing plan already covers (e.g. a Gym + Badminton combo
// on top of a standalone Gym plan).
//
// 'pending' is deliberately NOT blocking: a pending membership is an unpaid/abandoned
// checkout, and treating one as live would lock a member out for the plan's whole
// duration. 'frozen' IS blocking — it is a paid membership that is merely paused.
const BLOCKING_STATUSES = ['active', 'frozen'];

const normalizeSports = (list) =>
  (list || []).map((s) => String(s || '').trim().toLowerCase()).filter(Boolean);

/**
 * Find a live membership that clashes with the plan the member is trying to take.
 *
 * @param {ObjectId|string} studentId
 * @param {Object} plan            MembershipPlan document (needs sportsIncluded, name)
 * @param {Object} [opts]
 * @param {ObjectId|string} [opts.ignorePlanId]  Skip this plan — used by renewal paths,
 *                                               where extending the SAME plan is valid.
 * @param {Object} [opts.session]  Mongoose session, so the check joins the transaction.
 * @returns {Promise<null|{membership, existingPlanName, conflictingSports}>}
 */
async function findConflictingMembership(studentId, plan, opts = {}) {
  const { ignorePlanId = null, session = null } = opts;
  if (!studentId || !plan) return null;

  let query = Membership.find({
    studentId,
    status: { $in: BLOCKING_STATUSES },
    endDate: { $gt: new Date() },
  }).populate('planId');
  if (session) query = query.session(session);

  const live = await query;
  const wanted = normalizeSports(plan.sportsIncluded);

  for (const existing of live) {
    if (!existing.planId) continue;
    if (ignorePlanId && String(existing.planId._id) === String(ignorePlanId)) continue;

    const held = normalizeSports(existing.planId.sportsIncluded);

    // Fallback for plans that carry no sport tags (older/bespoke plans): the exact
    // same plan twice is still a duplicate, even when we cannot compare by sport.
    if (!wanted.length || !held.length) {
      if (String(existing.planId._id) === String(plan._id)) {
        return { membership: existing, existingPlanName: existing.planId.name, conflictingSports: [] };
      }
      continue;
    }

    const clash = held.filter((s) => wanted.includes(s));
    if (clash.length) {
      return { membership: existing, existingPlanName: existing.planId.name, conflictingSports: clash };
    }
  }

  return null;
}

function conflictMessage(conflict, { self = false } = {}) {
  const who = self ? 'You already have' : 'This member already has';
  const until = new Date(conflict.membership.endDate).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
  const sports = conflict.conflictingSports.length
    ? ` covering ${conflict.conflictingSports.join(', ')}`
    : '';
  const fix = self
    ? 'Only one active membership is allowed per sport. Please wait for it to expire or contact the academy.'
    : 'Only one active membership is allowed per sport. Cancel the existing one, or use Renew to extend it.';
  return `${who} an active membership — "${conflict.existingPlanName}"${sports} — valid until ${until}. ${fix}`;
}

module.exports = { findConflictingMembership, conflictMessage, BLOCKING_STATUSES };
