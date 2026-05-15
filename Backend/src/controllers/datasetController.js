const datasetService = require('../services/datasetService');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');

/**
 * @desc    Create a new dataset record
 * @route   POST /api/v1/datasets
 * @access  Public
 */
exports.createDataset = asyncHandler(async (req, res, next) => {
  const dataset = await datasetService.createDataset(req.body);
  
  res.status(201).json({
    success: true,
    data: dataset
  });
});

/**
 * @desc    Get all dataset records
 * @route   GET /api/v1/datasets
 * @access  Public
 */
exports.getAllDatasets = asyncHandler(async (req, res, next) => {
  const datasets = await datasetService.getAllDatasets(req.query);
  
  res.status(200).json({
    success: true,
    count: datasets.length,
    data: datasets
  });
});

/**
 * @desc    Get a single dataset by ID
 * @route   GET /api/v1/datasets/:id
 * @access  Public
 */
exports.getDatasetById = asyncHandler(async (req, res, next) => {
  const dataset = await datasetService.getDatasetById(req.params.id);
  
  if (!dataset) {
    return next(new ErrorResponse('Dataset not found', 404));
  }

  res.status(200).json({
    success: true,
    data: dataset
  });
});

/**
 * @desc    Update a dataset record
 * @route   PUT /api/v1/datasets/:id
 * @access  Public
 */
exports.updateDataset = asyncHandler(async (req, res, next) => {
  const dataset = await datasetService.updateDataset(req.params.id, req.body);
  
  if (!dataset) {
    return next(new ErrorResponse('Dataset not found', 404));
  }

  res.status(200).json({
    success: true,
    data: dataset
  });
});

/**
 * @desc    Delete a dataset record
 * @route   DELETE /api/v1/datasets/:id
 * @access  Public
 */
exports.deleteDataset = asyncHandler(async (req, res, next) => {
  const dataset = await datasetService.deleteDataset(req.params.id);
  
  if (!dataset) {
    return next(new ErrorResponse('Dataset not found', 404));
  }

  res.status(200).json({
    success: true,
    data: {} 
  });
});
