const router = require('express').Router();
const ctrl = require('../controllers/blog.controller');
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const upload = require('../middleware/upload.middleware');

// Public
router.get('/', ctrl.list);
router.get('/featured/list', ctrl.getFeatured);
router.get('/:slug', ctrl.getOne);

// Admin — featured
router.put('/featured/list', auth, authorize('superadmin', 'admin'), ctrl.setFeatured);

// Admin CRUD
router.post('/', auth, authorize('superadmin', 'admin'), upload.single('imageFile'), ctrl.create);
router.put('/:id', auth, authorize('superadmin', 'admin'), upload.single('imageFile'), ctrl.update);
router.delete('/:id', auth, authorize('superadmin', 'admin'), ctrl.remove);

module.exports = router;
