const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const ic = require('../controllers/inventory.controller');

router.get('/', auth, authorize('superadmin', 'manager'), ic.getAll);
router.post('/', auth, authorize('superadmin', 'manager'), ic.create);
router.put('/:id', auth, authorize('superadmin', 'manager'), ic.update);
router.put('/:id/restock', auth, authorize('superadmin', 'manager'), ic.restock);
router.get('/low-stock', auth, authorize('superadmin', 'manager'), ic.getLowStock);

module.exports = router;
