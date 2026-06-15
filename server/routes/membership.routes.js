const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const optAuth = require('../middleware/optAuth.middleware');
const authorize = require('../middleware/role.middleware');
const mc = require('../controllers/membership.controller');

// Plans
router.get('/plans', mc.getPlans);
router.post('/plans', auth, authorize('superadmin'), mc.createPlan);
router.put('/plans/:id', auth, authorize('superadmin'), mc.updatePlan);
router.delete('/plans/:id', auth, authorize('superadmin'), mc.deletePlan);

// Public Membership Booking (optAuth so logged-in users get req.user set)
router.post('/memberships/public-purchase', optAuth, mc.publicPurchaseOrder);
router.post('/memberships/public-verify', optAuth, mc.publicVerifyPayment);

// Memberships
router.get('/memberships/all', auth, authorize('superadmin'), mc.getAllMemberships);
router.get('/memberships/:studentId', auth, mc.getStudentMembership);
router.post('/memberships/assign', auth, authorize('superadmin'), mc.assignMembership);
router.put('/memberships/:id/renew', auth, authorize('superadmin'), mc.renewMembership);
router.put('/memberships/:id/freeze', auth, authorize('superadmin'), mc.freezeMembership);
router.put('/memberships/:id/unfreeze', auth, authorize('superadmin'), mc.unfreezeMembership);

// QR Check-in
router.get('/memberships/validate/:id', auth, authorize('superadmin'), mc.validateMembershipQR);
router.post('/memberships/:id/check-in', auth, authorize('superadmin'), mc.checkInMembership);

module.exports = router;
