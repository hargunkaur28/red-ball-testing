const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const ac = require('../controllers/analytics.controller');

router.get('/overview', auth, authorize('superadmin'), ac.getOverview);
router.get('/revenue', auth, authorize('superadmin'), ac.getRevenue);
router.get('/memberships', auth, authorize('superadmin'), ac.getMemberships);
router.get('/sports-popularity', auth, authorize('superadmin'), ac.getSportsPopularity);
router.get('/restaurant', auth, authorize('superadmin', 'manager'), ac.getRestaurantAnalytics);
router.get('/recent-activity', auth, authorize('superadmin'), ac.getRecentActivity);
router.get('/occupancy', auth, authorize('superadmin'), ac.getOccupancy);

module.exports = router;
