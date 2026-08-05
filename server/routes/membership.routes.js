const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const mc = require('../controllers/membership.controller');

const upload = require('../middleware/upload.middleware');

// Plans
router.get('/plans', mc.getPlans);
router.post('/plans', auth, authorize('superadmin'), upload.single('imageFile'), mc.createPlan);
router.put('/plans/:id', auth, authorize('superadmin'), upload.single('imageFile'), mc.updatePlan);
router.delete('/plans/:id', auth, authorize('superadmin'), mc.deletePlan);

// Membership purchase — sign-in REQUIRED for every plan type (sport, combo, court,
// coaching). Guest checkout is deliberately not supported: a membership must belong to
// a real account so entitlements, QR entry and renewals resolve to one member.
router.post('/memberships/public-purchase', auth, mc.publicPurchaseOrder);
router.post('/memberships/public-verify', auth, mc.publicVerifyPayment);

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
