const authService = require('../services/authService');
const asyncHandler = require('../middlewares/asyncHandler');

// Helper to send token response
const sendTokenResponse = (authData, statusCode, res) => {
  const { user, token } = authData;
  
  // Exclude password from output
  user.password = undefined;

  res.status(statusCode).json({
    success: true,
    token,
    data: user
  });
};

/**
 * @desc    Register user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const result = await authService.register(req.body);
  sendTokenResponse(result, 201, res);
});

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  sendTokenResponse(result, 200, res);
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await authService.getMe(req.user.id);
  
  res.status(200).json({
    success: true,
    data: user
  });
});
