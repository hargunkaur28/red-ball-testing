const express = require('express');
const router = express.Router();
const academySettingsController = require('../controllers/academySettings.controller');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

// Public — no auth required
router.get('/public', academySettingsController.getPublicAcademySettings);

// Superadmin only
router.use(auth);
router.use(authorize('superadmin'));

router.get('/', academySettingsController.getAcademySettings);
router.put('/', academySettingsController.updateAcademySettings);

module.exports = router;
