const express = require('express');
const {
  createDataset,
  getAllDatasets,
  getDatasetById,
  updateDataset,
  deleteDataset
} = require('../controllers/datasetController');

const router = express.Router();

router.route('/')
  .post(createDataset)
  .get(getAllDatasets);

router.route('/:id')
  .get(getDatasetById)
  .put(updateDataset)
  .delete(deleteDataset);

module.exports = router;
