/**
 * Shared coupon validation logic used by all checkout paths.
 *
 * @param {object} opts
 * @param {string}  opts.code       - Coupon code (will be uppercased/trimmed)
 * @param {string}  opts.targetType - 'food' | 'sports' | 'both'
 * @param {string}  [opts.sportId]  - Required when targetType === 'sports'
 * @param {string}  [opts.userId]   - Authenticated user's ID (from req.user, never from client body)
 * @param {number}  opts.amount     - Order/booking subtotal in rupees (server-calculated)
 *
 * @returns {{ valid: boolean, message?: string, coupon?: object, discountAmount?: number, finalAmount?: number }}
 */
const Coupon = require('../models/Coupon');
const CouponUsage = require('../models/CouponUsage');

async function validateCouponForCheckout({ code, targetType, sportId, userId, amount }) {
  const coupon = await Coupon.findOne({ code: code.toUpperCase().trim() });

  if (!coupon) return { valid: false, message: 'Invalid coupon code.' };
  if (coupon.archivedAt) return { valid: false, message: 'This coupon is no longer available.' };
  if (!coupon.isActive) return { valid: false, message: 'This coupon is currently inactive.' };

  const now = new Date();
  if (coupon.startsAt && now < coupon.startsAt) return { valid: false, message: 'This coupon is not yet valid.' };
  if (coupon.endsAt && now > coupon.endsAt) return { valid: false, message: 'This coupon has expired.' };

  if (coupon.targetType !== 'both' && coupon.targetType !== targetType) {
    return { valid: false, message: `This coupon is not applicable for ${targetType} orders.` };
  }

  // Sport match — enforce when the coupon restricts to specific sports
  if (targetType === 'sports' && !coupon.appliesToAllSports && coupon.sportIds.length > 0) {
    if (!sportId) return { valid: false, message: 'A sport must be selected to use this coupon.' };
    const matches = coupon.sportIds.some((sid) => sid.toString() === sportId.toString());
    if (!matches) return { valid: false, message: 'This coupon is not applicable for this sport.' };
  }

  if (coupon.minOrderAmount && amount < coupon.minOrderAmount) {
    return { valid: false, message: `Minimum order amount of ₹${coupon.minOrderAmount} required for this coupon.` };
  }

  if (coupon.usageLimitTotal != null && coupon.usedCount >= coupon.usageLimitTotal) {
    return { valid: false, message: 'This coupon has reached its usage limit.' };
  }

  // Specific-user eligibility — userId comes from req.user only, never from the client body
  if (coupon.visibility === 'specific-users') {
    if (!userId) return { valid: false, message: 'Please log in to use this coupon.' };
    const eligible = coupon.eligibleUserIds.some((uid) => uid.toString() === userId.toString());
    if (!eligible) return { valid: false, message: 'You are not eligible for this coupon.' };
  }

  // Per-user usage limit
  if (coupon.usageLimitPerUser != null && userId) {
    const used = await CouponUsage.countDocuments({ couponId: coupon._id, userId });
    if (used >= coupon.usageLimitPerUser) {
      return { valid: false, message: 'You have already used this coupon the maximum number of times.' };
    }
  }

  // Calculate discount
  let discountAmount;
  if (coupon.discountType === 'percentage') {
    const pct = (coupon.discountValue / 100) * amount;
    const cap = coupon.maxDiscountAmount != null ? coupon.maxDiscountAmount : Infinity;
    discountAmount = Math.min(pct, cap);
  } else {
    discountAmount = Math.min(coupon.discountValue, amount);
  }

  discountAmount = Math.max(0, Math.round(discountAmount * 100) / 100);
  const finalAmount = Math.max(0, amount - discountAmount);

  return { valid: true, coupon, discountAmount, finalAmount };
}

module.exports = { validateCouponForCheckout };
