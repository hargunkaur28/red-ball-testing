const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const oc = require('../controllers/order.controller');

router.get('/', auth, authorize('superadmin', 'manager'), oc.getAll);
router.post('/', auth, oc.create);
router.post('/direct', oc.createDirect);
router.post('/table-order', oc.createDirect);
router.post('/create-razorpay-order', oc.createRazorpayOrder);
router.get('/table/:tableId', oc.getTableOrders);
router.get('/my-orders', auth, oc.getCustomerOrders);
router.put('/:id/status', auth, authorize('superadmin', 'manager'), oc.updateStatus);
router.put('/:id/cancel', auth, authorize('superadmin', 'manager'), oc.cancelOrder);
router.put('/:id/prep-time', auth, authorize('superadmin', 'manager'), oc.setPrepTime);
router.put('/:id/items/:itemId/cancel', auth, authorize('superadmin', 'manager'), oc.cancelItem);
router.put('/:id/items/:itemId/refund', auth, authorize('superadmin', 'manager'), oc.refundItem);

module.exports = router;
