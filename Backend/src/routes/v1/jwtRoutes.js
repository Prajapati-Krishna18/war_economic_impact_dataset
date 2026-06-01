const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { protect, authorize } = require('../../middlewares/authMiddleware');
const asyncHandler = require('../../middlewares/asyncHandler');
const ApiResponse = require('../../utils/apiResponse');
const ErrorResponse = require('../../utils/errorResponse');

router.options('/', (req, res) => res.set('Allow', 'GET, POST, DELETE, OPTIONS').status(204).end());

/** @route POST /api/v1/jwt/generate-token */
router.post('/generate-token', protect, (req, res) => {
  const token = req.user.getSignedJwtToken
    ? req.user.getSignedJwtToken()
    : jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  new ApiResponse(200, { token }, 'Token generated successfully').send(res);
});

/** @route POST /api/v1/jwt/verify-token */
router.post('/verify-token', asyncHandler(async (req, res, next) => {
  const { token } = req.body;
  if (!token) return next(new ErrorResponse('Please provide a token', 400));
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    new ApiResponse(200, { valid: true, decoded }, 'Token is valid').send(res);
  } catch {
    new ApiResponse(401, { valid: false }, 'Token is invalid or expired').send(res);
  }
}));

/** @route POST /api/v1/jwt/refresh-token */
router.post('/refresh-token', protect, (req, res) => {
  const token = jwt.sign(
    { id: req.user._id, role: req.user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  new ApiResponse(200, { token }, 'Token refreshed').send(res);
});

/** @route DELETE /api/v1/jwt/logout */
router.delete('/logout', protect, (req, res) => {
  new ApiResponse(200, {}, 'JWT session ended. Discard your token on the client.').send(res);
});

/** @route GET /api/v1/jwt/profile */
router.get('/profile', protect, (req, res) => {
  new ApiResponse(200, req.user, 'JWT protected profile').send(res);
});

/** @route GET /api/v1/jwt/dashboard */
router.get('/dashboard', protect, (req, res) => {
  new ApiResponse(200, { user: req.user, message: 'JWT Dashboard Access Granted' }, 'JWT dashboard').send(res);
});

/** @route GET /api/v1/jwt/admin */
router.get('/admin', protect, authorize('admin'), (req, res) => {
  new ApiResponse(200, { user: req.user, access: 'admin' }, 'Admin route accessed').send(res);
});

/** @route GET /api/v1/jwt/user */
router.get('/user', protect, (req, res) => {
  new ApiResponse(200, { user: req.user, access: 'user' }, 'User route accessed').send(res);
});

module.exports = router;
