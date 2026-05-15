const mongoose = require('mongoose');

const ConflictSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Conflict name is required'],
    unique: true, // Optimized constraint
    trim: true,
    index: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    default: null // null signifies an ongoing conflict
  },
  // Embedding an array of strings directly for simpler data architectures
  affectedRegions: [{
    type: String,
    trim: true
  }],
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('Conflict', ConflictSchema);
