const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const otpCtrl = require('../controllers/onetimeplay.controller');

router.post('/create-razorpay-order', auth, authorize('superadmin'), otpCtrl.createRazorpayOrder);

router.get('/', auth, authorize('superadmin'), otpCtrl.getAll);
router.post('/', auth, authorize('superadmin'), otpCtrl.create);
router.get('/:id', auth, authorize('superadmin'), otpCtrl.getById);
router.delete('/:id', auth, authorize('superadmin'), otpCtrl.delete);

module.exports = router;
