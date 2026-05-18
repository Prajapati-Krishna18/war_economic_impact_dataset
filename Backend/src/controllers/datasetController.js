const datasetService = require('../services/datasetService');
const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const ApiResponse = require('../utils/apiResponse');

/**
 * @desc    Create a new dataset record
 * @route   POST /api/v1/datasets
 * @access  Public
 */
exports.createDataset = asyncHandler(async (req, res, next) => {
  const dataset = await datasetService.createDataset(req.body);
  
  new ApiResponse(201, dataset, 'Dataset created successfully').send(res);
});

/**
 * @desc    Get all dataset records
 * @route   GET /api/v1/datasets
 * @access  Public
 */
exports.getAllDatasets = asyncHandler(async (req, res, next) => {
  const result = await datasetService.getAllDatasets(req.query);
  
  const meta = {
    count: result.count,
    total: result.total,
    pagination: result.pagination
  };

  new ApiResponse(200, result.data, 'Datasets fetched successfully', meta).send(res);
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

  new ApiResponse(200, dataset, 'Dataset fetched successfully').send(res);
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

  new ApiResponse(200, dataset, 'Dataset updated successfully').send(res);
});

/**
 * @desc    Delete a dataset record
 * @route   DELETE /api/v1/datasets/:id
 * @access  Private/Admin
 */
exports.deleteDataset = asyncHandler(async (req, res, next) => {
  const dataset = await datasetService.deleteDataset(req.params.id);
  
  if (!dataset) {
    return next(new ErrorResponse('Dataset not found', 404));
  }

  new ApiResponse(200, {}, 'Dataset deleted successfully').send(res);
});

/**
 * @desc    Get aggregated economic analytics by region
 * @route   GET /api/v1/datasets/analytics/regions
 * @access  Public
 */
exports.getRegionAnalytics = asyncHandler(async (req, res, next) => {
  const { startYear, endYear } = req.query;
  const analytics = await datasetService.getRegionAnalytics(startYear, endYear);

  new ApiResponse(200, analytics, 'Region analytics fetched successfully', { count: analytics.length }).send(res);
});
