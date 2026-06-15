const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');

router.get('/', serviceController.getAll);

router.use(auth);

router.post('/', authorize('superadmin'), serviceController.create);
router.put('/:id', authorize('superadmin'), serviceController.update);
router.delete('/:id', authorize('superadmin'), serviceController.delete);
router.patch('/:id/toggle', authorize('superadmin'), serviceController.toggleStatus);

module.exports = router;
