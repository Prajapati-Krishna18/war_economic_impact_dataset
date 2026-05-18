const mongoose = require('mongoose');

const DatasetSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Country name is required'],
    trim: true,
    index: true // Indexed for faster search
  },
  region: {
    type: String,
    required: [true, 'Region is required'],
    trim: true,
    index: true // Indexed for filtering by region
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1800, 'Year must be greater than or equal to 1800'],
    max: [new Date().getFullYear(), 'Year cannot be in the future'],
    index: true
  },
  // Embedding related economic metrics inside a sub-object
  economicMetrics: { 
    inflationRate: {
      type: Number,
      default: null, // null if data is missing
    },
    gdpGrowth: {
      type: Number,
      default: null
    },
    unemploymentRate: {
      type: Number,
      default: null,
      min: [0, 'Unemployment rate cannot be negative'],
      max: [100, 'Unemployment rate cannot exceed 100%']
    }
  },
  status: {
    type: String,
    enum: {
      values: ['stable', 'at-risk', 'crisis', 'post-conflict recovery'],
      message: '{VALUE} is not a valid status'
    },
    default: 'stable',
    index: true
  },
  // Implementing a reference to another collection (Conflict)
  conflictReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conflict', 
    default: null
  }
}, { 
  collection: 'dataset',
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Compound index to ensure we don't have duplicate records for a country in the same year
DatasetSchema.index({ country: 1, year: 1 }, { unique: true });

// Text index to heavily optimize search operations (replacing slow regex)
DatasetSchema.index({ country: 'text', region: 'text' }, { weights: { country: 10, region: 5 } });

// Compound index to optimize the analytics aggregation pipeline (filtering by year, grouping by region)
DatasetSchema.index({ region: 1, year: -1 });

module.exports = mongoose.model('Dataset', DatasetSchema);
