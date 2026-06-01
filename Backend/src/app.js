const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const { requestLogger } = require('./middlewares/loggerMiddleware');
const { apiLimiter } = require('./middlewares/rateLimiter');

const app = express();

// ── Security Headers ────────────────────────────────────────────────────────
app.use(helmet());

// ── Rate Limiting ────────────────────────────────────────────────────────────
app.use('/api/', apiLimiter);

// ── NoSQL Injection Prevention ───────────────────────────────────────────────
app.use(mongoSanitize());

// ── HTTP Parameter Pollution Prevention ──────────────────────────────────────
app.use(hpp());

// ── Request Logger ────────────────────────────────────────────────────────────
app.use(requestLogger);

// ── CORS ─────────────────────────────────────────────────────────────────────
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

// ── Body Parsers ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── Root Welcome ──────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the War Economic Impact API 🌍',
    version: 'v1',
    docs: 'https://documenter.getpostman.com/view/50840969/2sBXwmRD8o',
    health: '/api/v1/health',
    endpoints: {
      conflicts:  '/api/v1/conflicts',
      datasets:   '/api/v1/datasets',
      stats:      '/api/v1/stats',
      search:     '/api/v1/search',
      auth:       '/api/v1/auth',
      jwt:        '/api/v1/jwt',
      admin:      '/api/v1/admin',
      compare:    '/api/v1/compare?conflict1=WWII&conflict2=Ukraine-Russia War',
    },
  });
});

// ── Main API Router ───────────────────────────────────────────────────────────
app.use('/api', routes);

// ── 404 Handler ───────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ── Global Error Handler ──────────────────────────────────────────────────────
app.use(errorHandler);

module.exports = app;
