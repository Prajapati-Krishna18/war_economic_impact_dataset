const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const { requestLogger } = require('./middlewares/loggerMiddleware');

const app = express();

// Set security HTTP headers
app.use(helmet());

// Rate limiting (e.g., max 100 requests per 10 mins)
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 10 * 60 * 1000, 
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100
});
app.use('/api/', limiter);

// Prevent NoSQL injections by sanitizing user-supplied data
app.use(mongoSanitize());

// Prevent HTTP Parameter Pollution (HPP)
app.use(hpp());

// Middlewares
app.use(requestLogger);

// CORS configuration (Environment-based controlled origins)
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '10kb' })); // Limit body payload to prevent DoS
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Base route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the War Economic Impact API. Access endpoints via /api/v1');
});

// Routes
app.use('/api/v1', routes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
