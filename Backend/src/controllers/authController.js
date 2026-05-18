const authService = require('../services/authService');
const asyncHandler = require('../middlewares/asyncHandler');
const ApiResponse = require('../utils/apiResponse');

// Helper to send token response
const sendTokenResponse = (authData, statusCode, res, message) => {
  const { user, token } = authData;
  
  // Exclude password from output
  user.password = undefined;

  new ApiResponse(statusCode, { user, token }, message).send(res);
};

/**
 * @desc    Register user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const result = await authService.register(req.body);
  sendTokenResponse(result, 201, res, 'User registered successfully');
});

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  sendTokenResponse(result, 200, res, 'Login successful');
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await authService.getMe(req.user.id);
  
  new ApiResponse(200, user, 'User profile fetched successfully').send(res);
});
