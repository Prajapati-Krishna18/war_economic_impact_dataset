const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const { errorHandler } = require('./middlewares/errorMiddleware');
const { requestLogger } = require('./middlewares/loggerMiddleware');

const app = express();

// Middlewares
app.use(requestLogger);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base route for the root path
app.get('/', (req, res) => {
  res.send('Welcome to the War Economic Impact API. Access endpoints via /api/v1');
});

// Routes
app.use('/api/v1', routes);

// Error Handling Middleware
app.use(errorHandler);

module.exports = app;
