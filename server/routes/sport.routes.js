const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const sportController = require('../controllers/sport.controller');
const upload = require('../middleware/upload.middleware');

const optionalAuth = async (req, res, next) => {
  const hasBearerToken = req.headers.authorization?.startsWith('Bearer ');
  if (!hasBearerToken) return next();
  return auth(req, res, next);
};

// ==========================================
// DISCOUNT ROUTES (specific paths first)
// ==========================================
router.get('/discounts/public', sportController.getPublicDiscounts);
router.get('/discounts', auth, authorize('superadmin'), sportController.getDiscounts);
router.post('/discounts', auth, authorize('superadmin'), sportController.createDiscount);
router.put('/discounts/:id', auth, authorize('superadmin'), sportController.updateDiscount);
router.delete('/discounts/:id', auth, authorize('superadmin'), sportController.deleteDiscount);

// ==========================================
// HERO CARD ROUTES (must be before /:id)
// ==========================================
router.get('/hero-cards/public', sportController.getPublicHeroCards);
router.get('/hero-cards', auth, authorize('superadmin'), sportController.getHeroCards);
router.post('/hero-cards', auth, authorize('superadmin'), sportController.createHeroCard);
router.put('/hero-cards/:cardId', auth, authorize('superadmin'), sportController.updateHeroCard);
router.delete('/hero-cards/:cardId', auth, authorize('superadmin'), sportController.deleteHeroCard);

// ==========================================
// SUPERADMIN SPORT MANAGEMENT ROUTES
// ==========================================
router.get('/public', sportController.getPublicSports);
router.get('/public/:slug', optionalAuth, sportController.getPublicSportBySlug);
router.get('/court-memberships/public', sportController.listPublicCourtMemberships);
router.get('/court-memberships', auth, authorize('superadmin'), sportController.listCourtMemberships);
router.get('/', auth, authorize('superadmin'), sportController.getAllSports);
router.get('/:id', auth, authorize('superadmin'), sportController.getSportById);
router.post('/', auth, authorize('superadmin'), upload.single('imageFile'), sportController.createSport);
router.put('/:id', auth, authorize('superadmin'), upload.single('imageFile'), sportController.updateSport);
router.delete('/:id', auth, authorize('superadmin'), sportController.deleteSport);
router.patch('/:id/unarchive', auth, authorize('superadmin'), sportController.unarchiveSport);
router.patch('/:id/toggle', auth, authorize('superadmin'), sportController.toggleActive);
router.post('/:id/regenerate-qr', auth, authorize('superadmin'), sportController.regenerateQR);
router.post('/:id/court-memberships', auth, authorize('superadmin'), sportController.upsertCourtMemberships);
router.put('/:id/court-memberships', auth, authorize('superadmin'), sportController.upsertCourtMemberships);
router.delete('/:id/court-memberships', auth, authorize('superadmin'), sportController.deleteCourtMemberships);

// ==========================================
// PHASE 3 — SMART ENTRY QR ACCESS ROUTES
// Rate-limited and authenticated (except rate-limiter is applied first)
// ==========================================
router.get('/entry-check/:qrSlug', sportController.entryRateLimiter, optionalAuth, sportController.entryCheck);
router.post('/entry-checkin/:qrSlug', sportController.entryRateLimiter, auth, sportController.entryCheckIn);
router.post('/entry-checkout/:qrSlug', sportController.entryRateLimiter, auth, sportController.entryCheckOut);
router.post('/entry-pay-instant/:qrSlug', sportController.entryRateLimiter, auth, sportController.entryPayInstant);
router.post('/entry-pay-verify/:qrSlug', sportController.entryRateLimiter, auth, sportController.entryPayVerify);
router.post('/entry-buy-membership/:qrSlug', sportController.entryRateLimiter, auth, sportController.entryBuyMembership);
router.post('/entry-verify-membership/:qrSlug', sportController.entryRateLimiter, auth, sportController.entryVerifyMembership);

module.exports = router;
