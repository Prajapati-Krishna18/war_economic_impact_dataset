const mongoose = require('mongoose');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../middlewares/asyncHandler');

/**
 * @desc    Get system health status including database and server uptime
 * @route   GET /api/v1/health
 * @access  Public
 */
exports.getHealthStatus = asyncHandler(async (req, res, next) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  const healthData = {
    server: 'healthy',
    database: dbStatus,
    uptime: `${Math.floor(process.uptime())} seconds`,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  };

  // If database is disconnected, we consider the API degraded, but still respond
  const statusCode = dbStatus === 'connected' ? 200 : 503;
  const message = dbStatus === 'connected' ? 'API is healthy and running' : 'API is degraded - Database disconnected';

  new ApiResponse(statusCode, healthData, message).send(res);
});
