const winston = require('winston');

// Define log format for development (Colorized, Readable)
const devFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(
    ({ timestamp, level, message, stack }) => `${timestamp} [${level}]: ${stack || message}`
  )
);

// Define log format for production (Structured JSON, Minimal)
const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: process.env.NODE_ENV === 'development' ? devFormat : prodFormat,
  transports: [
    new winston.transports.Console()
  ],
});

module.exports = logger;
