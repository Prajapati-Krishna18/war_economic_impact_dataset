const mongoose = require('mongoose');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../middlewares/asyncHandler');
const pkg = require('../../package.json');

/**
 * @route   GET /api/v1/health
 * @access  Public
 */
exports.getHealthStatus = asyncHandler(async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  const healthData = {
    server: 'healthy', database: dbStatus,
    uptime: `${Math.floor(process.uptime())} seconds`,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  };
  const statusCode = dbStatus === 'connected' ? 200 : 503;
  const message = dbStatus === 'connected' ? 'API is healthy and running' : 'API is degraded - Database disconnected';
  new ApiResponse(statusCode, healthData, message).send(res);
});

/**
 * @route   GET /api/v1/version
 * @access  Public
 */
exports.getVersion = (req, res) => {
  new ApiResponse(200, {
    version: pkg.version,
    name: pkg.name,
    description: pkg.description,
    apiVersion: 'v1',
    nodeVersion: process.version,
  }, 'API version info').send(res);
};

/**
 * @route   HEAD /api/v1/health
 * @access  Public
 */
exports.headHealth = asyncHandler(async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.set('X-DB-Status', dbStatus).set('X-Uptime', `${Math.floor(process.uptime())}s`).status(200).end();
});

