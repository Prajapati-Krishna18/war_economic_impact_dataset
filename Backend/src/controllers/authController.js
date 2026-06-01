const authService = require('../services/authService');
const asyncHandler = require('../middlewares/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const ErrorResponse = require('../utils/errorResponse');

// Helper to send token response
const sendTokenResponse = (authData, statusCode, res, message) => {
  const { user, token } = authData;
  user.password = undefined;
  new ApiResponse(statusCode, { user, token }, message).send(res);
};

/** @route POST /api/v1/auth/register */
exports.register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  sendTokenResponse(result, 201, res, 'User registered successfully');
});

/** @route POST /api/v1/auth/login */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  sendTokenResponse(result, 200, res, 'Login successful');
});

/** @route POST /api/v1/auth/logout */
exports.logout = asyncHandler(async (req, res) => {
  // Stateless JWT: instruct client to discard token
  new ApiResponse(200, {}, 'Logged out successfully. Please discard your token on the client.').send(res);
});

/** @route GET /api/v1/auth/me */
exports.getMe = asyncHandler(async (req, res) => {
  const user = await authService.getMe(req.user.id);
  new ApiResponse(200, user, 'User profile fetched successfully').send(res);
});

/** @route DELETE /api/v1/auth/account */
exports.deleteAccount = asyncHandler(async (req, res) => {
  await authService.deleteAccount(req.user.id);
  new ApiResponse(200, {}, 'Account deleted successfully').send(res);
});

/** @route POST /api/v1/auth/forgot-password */
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new ErrorResponse('Please provide an email address', 400));
  const result = await authService.forgotPassword(email);
  new ApiResponse(200, result, 'Password reset token generated').send(res);
});

/** @route POST /api/v1/auth/reset-password */
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { token, password } = req.body;
  if (!token || !password)
    return next(new ErrorResponse('Please provide token and new password', 400));
  const result = await authService.resetPassword(token, password);
  sendTokenResponse(result, 200, res, 'Password reset successful');
});

/** @route POST /api/v1/auth/refresh-token */
exports.refreshToken = asyncHandler(async (req, res, next) => {
  const result = await authService.refreshToken(req.user);
  new ApiResponse(200, result, 'Token refreshed successfully').send(res);
});
