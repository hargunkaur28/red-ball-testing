const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const authorize = require('../middleware/role.middleware');
const oc = require('../controllers/operation.controller');

router.get('/timeline', auth, oc.getTimeline);
router.get('/schedule', auth, oc.getSchedule);
router.get('/grounds', auth, oc.getGrounds);

router.post('/events', auth, authorize('superadmin'), oc.createEvent);
router.put('/events/:id', auth, authorize('superadmin'), oc.updateEvent);
router.post('/events/:id/reschedule', auth, authorize('superadmin'), oc.rescheduleEvent);
router.delete('/events/:id', auth, authorize('superadmin'), oc.deleteEvent);
router.post('/events/:id/start', auth, authorize('superadmin'), oc.startEvent);
router.post('/events/:id/end', auth, authorize('superadmin'), oc.endEvent);

module.exports = router;
