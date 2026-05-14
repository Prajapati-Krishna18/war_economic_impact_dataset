const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
  // Define your schema fields here based on your dataset structure
  // For example:
  // year: { type: Number },
  // country: { type: String },
  // economicImpact: { type: Number },
}, { 
  // Explicitly tell Mongoose to use the "dataset" collection
  collection: 'dataset',
  timestamps: true 
});

module.exports = mongoose.model('Dataset', datasetSchema);
