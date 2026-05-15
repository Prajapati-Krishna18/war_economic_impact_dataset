const datasetService = require('../services/datasetService');

/**
 * @desc    Create a new dataset record
 * @route   POST /api/v1/datasets
 * @access  Public (Should be restricted in production)
 */
exports.createDataset = async (req, res, next) => {
  try {
    const dataset = await datasetService.createDataset(req.body);
    
    res.status(201).json({
      success: true,
      data: dataset
    });
  } catch (error) {
    next(error); // Passes to global error handler
  }
};

/**
 * @desc    Get all dataset records
 * @route   GET /api/v1/datasets
 * @access  Public
 */
exports.getAllDatasets = async (req, res, next) => {
  try {
    const datasets = await datasetService.getAllDatasets(req.query);
    
    res.status(200).json({
      success: true,
      count: datasets.length,
      data: datasets
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single dataset by ID
 * @route   GET /api/v1/datasets/:id
 * @access  Public
 */
exports.getDatasetById = async (req, res, next) => {
  try {
    const dataset = await datasetService.getDatasetById(req.params.id);
    
    if (!dataset) {
      return res.status(404).json({
        success: false,
        error: 'Dataset not found'
      });
    }

    res.status(200).json({
      success: true,
      data: dataset
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a dataset record
 * @route   PUT /api/v1/datasets/:id
 * @access  Public (Should be restricted in production)
 */
exports.updateDataset = async (req, res, next) => {
  try {
    const dataset = await datasetService.updateDataset(req.params.id, req.body);
    
    if (!dataset) {
      return res.status(404).json({
        success: false,
        error: 'Dataset not found'
      });
    }

    res.status(200).json({
      success: true,
      data: dataset
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a dataset record
 * @route   DELETE /api/v1/datasets/:id
 * @access  Public (Should be restricted in production)
 */
exports.deleteDataset = async (req, res, next) => {
  try {
    const dataset = await datasetService.deleteDataset(req.params.id);
    
    if (!dataset) {
      return res.status(404).json({
        success: false,
        error: 'Dataset not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {} // Returning empty data is a standard for successful deletions
    });
  } catch (error) {
    next(error);
  }
};
