const rateLimit = require('express-rate-limit');

/**
 * Standard API rate limiter
 * Protects general endpoints from abuse and DDoS attacks
 */
exports.apiLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 10 * 60 * 1000, // Default: 10 mins
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100, // Default: 100 requests
  message: {
    success: false,
    status: 429,
    message: 'Too many requests from this IP, please try again later.'
  }
});

/**
 * Strict Auth rate limiter
 * Protects login and register routes against brute-force credential stuffing
 */
exports.authLimiter = rateLimit({
  windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000, // Default: 15 mins
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS, 10) || 10, // Default: 10 requests
  message: {
    success: false,
    status: 429,
    message: 'Too many login attempts from this IP, please try again after 15 minutes.'
  }
});
