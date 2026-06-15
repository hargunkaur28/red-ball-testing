const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

router.use(auth);

router.get('/', bookingController.getAll);
router.get('/:id', bookingController.getById);
router.post('/:id/check-in', authorize('superadmin'), bookingController.checkIn);
router.post('/:id/reschedule', authorize('superadmin'), bookingController.reschedule);
router.post('/:id/cancel', authorize('superadmin'), bookingController.cancel);

module.exports = router;
