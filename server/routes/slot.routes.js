const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const { optionalAuth } = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const sc = require('../controllers/slot.controller');

// ── Admin routes (specific paths must come before /:id) ──────────────────────
router.get('/admin/today-bookings', auth, authorize('superadmin', 'manager'), sc.adminTodayBookings);
router.get('/admin/bookings', auth, authorize('superadmin', 'manager'), sc.adminBookings);
router.get('/admin/live', auth, authorize('superadmin'), sc.adminLiveOverview);
router.get('/admin/live/:sportId', auth, authorize('superadmin'), sc.adminLiveSportDetail);
router.post('/admin/bulk', auth, authorize('superadmin'), sc.bulkCreateSlots);
router.delete('/admin/bulk', auth, authorize('superadmin'), sc.bulkDeleteSlots);
router.post('/admin/manual-booking', auth, authorize('superadmin'), sc.adminManualBooking);

// ── Membership slot booking (authenticated) ──────────────────────────────────
router.get('/membership/available', auth, sc.getMembershipAvailableSlots);
router.post('/membership/book', auth, sc.bookMembershipSlot);
router.get('/membership/my-bookings', auth, sc.getMyMembershipBookings);
router.delete('/membership/bookings/:id/cancel', auth, sc.cancelMembershipBooking);

// ── Public slot booking flow ─────────────────────────────────────────────────
router.get('/public/available', optionalAuth, sc.getPublicAvailableSlots);
router.post('/public/slot-order', optionalAuth, sc.createSlotOrder);
router.post('/public/slot-verify', optionalAuth, sc.verifySlotPayment);

// ── Legacy public-booking routes (QR portal) ─────────────────────────────────
router.post('/public-booking/order', sc.createPublicBookingOrder);
router.post('/public-booking', sc.createPublicBooking);

// ── Slot CRUD (superadmin only) ──────────────────────────────────────────────
router.get('/', sc.getSlots);
router.post('/', auth, authorize('superadmin'), sc.createSlot);
router.put('/:id', auth, authorize('superadmin'), sc.updateSlot);
router.delete('/:id', auth, authorize('superadmin'), sc.deleteSlot);

// ── Booking sub-routes ───────────────────────────────────────────────────────
router.get('/bookings/my-bookings', auth, sc.getMyBookings);
router.post('/bookings/:id/check-in', auth, authorize('superadmin'), sc.checkInBooking);
router.post('/bookings/:id/check-out', auth, authorize('superadmin'), sc.checkOutBooking);
router.post('/bookings/:id/cancel', auth, sc.cancelBooking);
router.get('/:id', sc.getSlot);

module.exports = router;
