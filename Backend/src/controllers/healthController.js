/**
 * @desc    Get system health status
 * @route   GET /api/v1/health
 * @access  Public
 */
exports.getHealthStatus = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      data: 'API is healthy and running',
    });
  } catch (error) {
    next(error);
  }
};
