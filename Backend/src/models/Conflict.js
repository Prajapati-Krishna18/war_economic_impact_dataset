const mongoose = require('mongoose');

const ConflictSchema = new mongoose.Schema(
  {
    // ── Identity ───────────────────────────────────────────────────────────
    conflictName: {
      type: String,
      required: [true, 'Conflict name is required'],
      trim: true,
      index: true,
    },
    type: {
      type: String,
      required: [true, 'Conflict type is required'],
      trim: true,
      index: true,
    },
    region: {
      type: String,
      required: [true, 'Region is required'],
      trim: true,
      index: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
      index: true,
    },
    startYear: {
      type: Number,
      required: [true, 'Start year is required'],
      min: [1000, 'Start year must be >= 1000'],
      index: true,
    },
    endYear: {
      type: Number,
      default: null, // null = Ongoing
    },
    status: {
      type: String,
      enum: {
        values: ['Ongoing', 'Resolved'],
        message: '{VALUE} is not a valid status. Use "Ongoing" or "Resolved".',
      },
      default: 'Ongoing',
      index: true,
    },

    // ── Economic Metrics ────────────────────────────────────────────────────
    inflationRate: {
      type: Number,
      default: null,
    },
    gdpChange: {
      type: Number,
      default: null,
    },
    povertyRate: {
      type: Number,
      default: null,
      min: [0, 'Poverty rate cannot be negative'],
      max: [100, 'Poverty rate cannot exceed 100'],
    },
    extremePovertyRate: {
      type: Number,
      default: null,
      min: [0, 'Extreme poverty rate cannot be negative'],
      max: [100, 'Extreme poverty rate cannot exceed 100'],
    },
    foodInsecurityRate: {
      type: Number,
      default: null,
      min: [0, 'Food insecurity rate cannot be negative'],
      max: [100, 'Food insecurity rate cannot exceed 100'],
    },

    // ── Employment ──────────────────────────────────────────────────────────
    preWarUnemployment: {
      type: Number,
      default: null,
    },
    duringWarUnemployment: {
      type: Number,
      default: null,
    },
    youthUnemployment: {
      type: Number,
      default: null,
    },

    // ── Sector & Black Market ───────────────────────────────────────────────
    primaryAffectedSector: {
      type: String,
      trim: true,
      default: null,
      index: true,
    },
    blackMarketLevel: {
      type: String,
      enum: {
        values: ['Low', 'Medium', 'High', 'Extreme'],
        message: '{VALUE} is not a valid black market level',
      },
      default: null,
    },
    blackMarketGoods: {
      type: String,
      trim: true,
      default: null,
    },
    warProfiteering: {
      type: String,
      enum: {
        values: ['Yes', 'No'],
        message: '{VALUE} is not valid. Use "Yes" or "No".',
      },
      default: null,
    },

    // ── Currency ────────────────────────────────────────────────────────────
    currencyDevaluation: {
      type: Number,
      default: null,
    },
    currencyBlackMarketGap: {
      type: Number,
      default: null,
    },

    // ── Financial Costs ─────────────────────────────────────────────────────
    reconstructionCost: {
      type: Number,
      default: null,
      min: [0, 'Reconstruction cost cannot be negative'],
    },
    costOfWar: {
      type: Number,
      default: null,
      min: [0, 'Cost of war cannot be negative'],
    },

    // ── Informal Economy ────────────────────────────────────────────────────
    preWarInformalEconomy: {
      type: Number,
      default: null,
    },
    duringWarInformalEconomy: {
      type: Number,
      default: null,
    },

    // ── Human Impact ────────────────────────────────────────────────────────
    householdsAffected: {
      type: Number,
      default: null,
      min: [0, 'Households affected cannot be negative'],
    },

    // ── Soft Delete ──────────────────────────────────────────────────────────
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: 'conflicts',
    timestamps: true,
  }
);

// ── Indexes ─────────────────────────────────────────────────────────────────
// Full-text search across name, country, region
ConflictSchema.index(
  { conflictName: 'text', country: 'text', region: 'text', type: 'text' },
  { weights: { conflictName: 10, country: 5, region: 5, type: 3 } }
);

// Compound for analytics
ConflictSchema.index({ region: 1, status: 1 });
ConflictSchema.index({ country: 1, startYear: -1 });
ConflictSchema.index({ inflationRate: -1 });
ConflictSchema.index({ gdpChange: 1 });
ConflictSchema.index({ reconstructionCost: -1 });

// ── Soft Delete Pre-Hooks ────────────────────────────────────────────────────
ConflictSchema.pre(/^find/, function (next) {
  if (this.getOptions().includeDeleted !== true) {
    this.where({ isDeleted: { $ne: true } });
  }
  if (typeof next === 'function') next();
});

ConflictSchema.pre('aggregate', function (next) {
  const firstStage = this.pipeline()[0];
  // Don't prepend if already filtering by isDeleted
  if (!firstStage || !firstStage.$match || firstStage.$match.isDeleted === undefined) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  }
  if (typeof next === 'function') next();
});

// ── Virtual: isOngoing ───────────────────────────────────────────────────────
ConflictSchema.virtual('isOngoing').get(function () {
  return this.status === 'Ongoing';
});

module.exports = mongoose.model('Conflict', ConflictSchema);
