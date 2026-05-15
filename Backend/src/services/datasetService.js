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
   * Get all dataset records with optional filters
   * @param {Object} query 
   * @returns {Array} array of datasets
   */
  async getAllDatasets(query = {}) {
    // In a real-world scenario, you might want to parse 'query' for pagination, sorting, etc.
    // For now, doing a simple find with optional query matching.
    return await Dataset.find(query).populate('conflictReference').lean();
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
