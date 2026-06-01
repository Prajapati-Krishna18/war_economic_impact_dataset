const express = require('express');
const { getHealthStatus, getVersion, headHealth } = require('../../controllers/healthController');
const conflictRoutes  = require('./conflictRoutes');
const datasetRoutes   = require('./datasetRoutes');
const authRoutes      = require('./authRoutes');
const statsRoutes     = require('./statsRoutes');
const searchRoutes    = require('./searchRoutes');
const adminRoutes     = require('./adminRoutes');
const jwtRoutes       = require('./jwtRoutes');

const router = express.Router();

// ── Health & Version ─────────────────────────────────────────────────────────
router.get('/health',   getHealthStatus);
router.head('/health',  headHealth);
router.get('/version',  getVersion);

// ── Compare ──────────────────────────────────────────────────────────────────
router.get('/compare', require('../../controllers/conflictController').compareConflicts);

// ── Core Resources ───────────────────────────────────────────────────────────
router.use('/conflicts',  conflictRoutes);
router.use('/datasets',   datasetRoutes);

// ── Auth ─────────────────────────────────────────────────────────────────────
router.use('/auth',       authRoutes);

// ── JWT ──────────────────────────────────────────────────────────────────────
router.use('/jwt',        jwtRoutes);

// ── Statistics ───────────────────────────────────────────────────────────────
router.use('/stats',      statsRoutes);

// ── Search ───────────────────────────────────────────────────────────────────
router.use('/search',     searchRoutes);

// ── Admin (protected) ────────────────────────────────────────────────────────
router.use('/admin',      adminRoutes);

module.exports = router;
