const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const ctrl = require('../controllers/sessionConfig.controller');

router.get('/', auth, authorize('superadmin', 'admin'), ctrl.getAll);
router.put('/', auth, authorize('superadmin', 'admin'), ctrl.upsertGlobal);
router.put('/sport/:sportSlug', auth, authorize('superadmin', 'admin'), ctrl.upsertSport);
router.delete('/:id', auth, authorize('superadmin', 'admin'), ctrl.deleteSportConfig);

module.exports = router;
