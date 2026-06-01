const rateLimit = require('express-rate-limit');

const makeRateLimiter = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, status: 429, message },
  });

/** Standard API limiter — 100 req / 10 min */
exports.apiLimiter = makeRateLimiter(
  parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 10 * 60 * 1000,
  parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100,
  'Too many requests from this IP, please try again later.'
);

/** Strict Auth limiter — 10 attempts / 15 min */
exports.authLimiter = makeRateLimiter(
  parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS, 10) || 15 * 60 * 1000,
  parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS, 10) || 10,
  'Too many login attempts from this IP, please try again after 15 minutes.'
);

/** Search limiter — 60 req / 1 min */
exports.searchLimiter = makeRateLimiter(
  60 * 1000, 60,
  'Too many search requests. Slow down and try again in a minute.'
);

/** Delete limiter — 20 req / 10 min */
exports.deleteLimiter = makeRateLimiter(
  10 * 60 * 1000, 20,
  'Too many delete requests from this IP. Please try again later.'
);

/** Import/bulk limiter — 5 req / 1 hour */
exports.importLimiter = makeRateLimiter(
  60 * 60 * 1000, 5,
  'Bulk import limit reached. Try again in an hour.'
);

/** Strict admin limiter — 30 req / 5 min */
exports.strictAdminLimiter = makeRateLimiter(
  5 * 60 * 1000, 30,
  'Admin rate limit exceeded. Please wait before making more requests.'
);
