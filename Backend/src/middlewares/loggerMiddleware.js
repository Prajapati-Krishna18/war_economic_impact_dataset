const logger = require('../utils/logger');

/**
 * Middleware to log all incoming HTTP requests
 * Computes request duration and logs using Winston
 */
const requestLogger = (req, res, next) => {
  const start = Date.now();
  
  // Wait for the response to finish before logging the status
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logMessage = `${req.method} ${req.originalUrl} - Status: ${res.statusCode} - ${duration}ms`;
    
    if (res.statusCode >= 500) {
      logger.error(logMessage);
    } else if (res.statusCode >= 400) {
      logger.warn(logMessage);
    } else {
      logger.info(logMessage);
    }
  });

  next();
};

module.exports = { requestLogger };
