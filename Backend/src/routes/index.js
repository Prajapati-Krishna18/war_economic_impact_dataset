const express = require('express');
const { getHealthStatus } = require('../controllers/healthController');
const datasetRoutes = require('./datasetRoutes');

const router = express.Router();

router.get('/health', getHealthStatus);

router.use('/datasets', datasetRoutes);

module.exports = router;
