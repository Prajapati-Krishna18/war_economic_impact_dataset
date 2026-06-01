const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../../middlewares/authMiddleware');
const conflictController = require('../../controllers/conflictController');
const ApiResponse = require('../../utils/apiResponse');
const { strictAdminLimiter } = require('../../middlewares/rateLimiter');

// All admin routes require authentication AND admin role
router.use(protect, authorize('admin'));

router.options('/', (req, res) => res.set('Allow', 'GET, POST, DELETE, PATCH, OPTIONS').status(204).end());
router.options('/conflicts/:conflictId', (req, res) => res.set('Allow', 'DELETE, PATCH, OPTIONS').status(204).end());

// Admin Dashboard
router.get('/dashboard', strictAdminLimiter, (req, res) => {
  new ApiResponse(200, {
    user: req.user,
    access: 'Admin Dashboard',
    endpoints: [
      'GET    /admin/conflicts',
      'POST   /admin/conflicts',
      'DELETE /admin/conflicts/:conflictId',
      'PATCH  /admin/conflicts/:conflictId',
    ],
  }, 'Admin dashboard accessed').send(res);
});

// Admin conflict management
router.get('/conflicts',                   conflictController.getAllConflicts);
router.post('/conflicts',                  conflictController.createConflict);
router.delete('/conflicts/:conflictId',    conflictController.deleteConflict);
router.patch('/conflicts/:conflictId',     conflictController.updateConflict);

// Protected read-only
router.get('/protected/conflicts',          conflictController.getAllConflicts);
router.post('/protected/conflicts',         conflictController.createConflict);
router.delete('/protected/conflicts/:conflictId', conflictController.deleteConflict);

module.exports = router;
