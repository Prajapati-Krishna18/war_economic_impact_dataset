const express = require('express');
const { getHealthStatus } = require('../controllers/healthController');
const datasetRoutes = require('./datasetRoutes');
const authRoutes = require('./authRoutes');

const router = express.Router();

router.get('/health', getHealthStatus);

router.use('/datasets', datasetRoutes);
router.use('/auth', authRoutes);

module.exports = router;
