 const Dataset = require('../models/Dataset');
const QueryBuilder = require('../utils/queryBuilder');

class DatasetService {
  /**
   * Create a new dataset record
   * @param {Object} data 
   * @returns {Object} created dataset
   */
  async createDataset(data) {
    const dataset = new Dataset(data);
    return await dataset.save();
  }

  /**
   * Get all dataset records with advanced querying
   * @param {Object} reqQuery 
   * @returns {Object} query results with pagination and metadata
   */
  async getAllDatasets(reqQuery = {}) {
    // We instantiate the query builder with a base query
    const builder = new QueryBuilder(Dataset.find().populate('conflictReference'), reqQuery)
      .filter()
      .sort()
      .limitFields();

    // Await pagination to resolve the count query
    await builder.paginate(Dataset);

    // Execute the fully constructed Mongoose query
    const results = await builder.query.lean();

    return {
      count: results.length,
      total: builder.total,
      pagination: builder.pagination,
      data: results
    };
  }

  /**
   * Get a single dataset by ID
   * @param {String} id 
   * @returns {Object|null} dataset or null
   */
  async getDatasetById(id) {
    return await Dataset.findById(id).populate('conflictReference').lean();
  }

  /**
   * Update a dataset record
   * @param {String} id 
   * @param {Object} data 
   * @returns {Object|null} updated dataset or null
   */
  async updateDataset(id, data) {
    return await Dataset.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate('conflictReference');
  }

  /**
   * Soft delete a dataset record
   * @param {String} id 
   * @returns {Object|null} soft deleted dataset or null
   */
  async deleteDataset(id) {
    return await Dataset.findByIdAndUpdate(
      id, 
      { isDeleted: true, deletedAt: new Date() }, 
      { new: true }
    );
  }

  /**
   * Get economic analytics grouped by region
   * Uses MongoDB Aggregation Pipeline
   * @param {Number} startYear 
   * @param {Number} endYear 
   * @returns {Array} aggregated analytics data
   */
  async getRegionAnalytics(startYear, endYear) {
    const matchStage = {};
    
    // Optional dynamic filtering by year
    if (startYear || endYear) {
      matchStage.year = {};
      if (startYear) matchStage.year.$gte = parseInt(startYear, 10);
      if (endYear) matchStage.year.$lte = parseInt(endYear, 10);
    }

    const pipeline = [
      // Stage 1: Match records based on criteria
      { $match: matchStage },
      
      // Stage 2: Group by region and calculate metrics
      {
        $group: {
          _id: '$region',
          totalRecords: { $sum: 1 },
          avgInflation: { $avg: '$economicMetrics.inflationRate' },
          avgGdpGrowth: { $avg: '$economicMetrics.gdpGrowth' },
          avgUnemployment: { $avg: '$economicMetrics.unemploymentRate' }
        }
      },
      
      // Stage 3: Project (format) the output
      {
        $project: {
          _id: 0,
          region: '$_id',
          totalRecords: 1,
          avgInflation: { $round: ['$avgInflation', 2] },
          avgGdpGrowth: { $round: ['$avgGdpGrowth', 2] },
          avgUnemployment: { $round: ['$avgUnemployment', 2] }
        }
      },
      
      // Stage 4: Sort by region alphabetically
      { $sort: { region: 1 } }
    ];

    return await Dataset.aggregate(pipeline);
  }
}

module.exports = new DatasetService();
