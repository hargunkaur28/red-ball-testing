const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const admissionController = require('../controllers/admission.controller');

router.get('/pending-fees', auth, authorize('superadmin'), admissionController.getPendingFees);
router.get('/', auth, authorize('superadmin'), admissionController.getAll);
router.post('/', auth, authorize('superadmin'), admissionController.create);
router.get('/:id', auth, authorize('superadmin'), admissionController.getById);
router.put('/:id', auth, authorize('superadmin'), admissionController.update);
router.delete('/:id', auth, authorize('superadmin'), admissionController.remove);

module.exports = router;
