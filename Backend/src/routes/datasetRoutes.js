const express = require('express');
const {
  createDataset,
  getAllDatasets,
  getDatasetById,
  updateDataset,
  deleteDataset,
  getRegionAnalytics
} = require('../controllers/datasetController');

// Import authentication middlewares
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Analytics endpoints (must be defined before /:id)
router.route('/analytics/regions')
  .get(getRegionAnalytics); // Public

// Route configuration with middleware chaining
router.route('/')
  .post(protect, authorize('admin', 'researcher'), createDataset)
  .get(getAllDatasets); // Public

router.route('/:id')
  .get(getDatasetById) // Public
  .put(protect, authorize('admin', 'researcher'), updateDataset)
  .delete(protect, authorize('admin'), deleteDataset);

module.exports = router;
