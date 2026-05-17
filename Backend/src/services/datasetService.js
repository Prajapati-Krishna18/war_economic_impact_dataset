const Dataset = require('../models/Dataset');

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
    const queryCopy = { ...reqQuery };

    // Fields to exclude from standard matching
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
    removeFields.forEach(param => delete queryCopy[param]);

    // Create query string with MongoDB operators ($gt, $gte, etc)
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    let parsedQuery = JSON.parse(queryStr);

    // Regex-based search (e.g., search by country or region)
    if (reqQuery.search) {
      parsedQuery.$or = [
        { country: { $regex: reqQuery.search, $options: 'i' } },
        { region: { $regex: reqQuery.search, $options: 'i' } }
      ];
    }

    let query = Dataset.find(parsedQuery).populate('conflictReference');

    // Select Fields
    if (reqQuery.select) {
      const fields = reqQuery.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Sort
    if (reqQuery.sort) {
      const sortBy = reqQuery.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = parseInt(reqQuery.page, 10) || 1;
    const limit = parseInt(reqQuery.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Dataset.countDocuments(parsedQuery);

    query = query.skip(startIndex).limit(limit).lean();

    // Execute query
    const results = await query;

    // Pagination result
    const pagination = {};
    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }
    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    return {
      count: results.length,
      total,
      pagination,
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
   * Delete a dataset record
   * @param {String} id 
   * @returns {Object|null} deleted dataset or null
   */
  async deleteDataset(id) {
    return await Dataset.findByIdAndDelete(id);
  }
}

module.exports = new DatasetService();
