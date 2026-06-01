const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const logger = require('./utils/logger');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

// Load models
const Dataset = require('./models/Dataset');
const Conflict = require('./models/Conflict');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const datasets = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/datasets.json'), 'utf-8')
);
const conflicts = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../data/conflicts.json'), 'utf-8')
);

/**
 * Import data into database
 */
const importData = async () => {
  try {
    logger.info('Starting data import process...');

    // Clear existing data
    await Dataset.deleteMany();
    await Conflict.deleteMany();
    logger.info('Existing records cleared.');

    // Insert datasets
    await Dataset.insertMany(datasets);
    logger.info(`✓ Imported ${datasets.length} dataset records`);

    // Insert conflicts
    await Conflict.insertMany(conflicts);
    logger.info(`✓ Imported ${conflicts.length} conflict records`);

    logger.info('✅ All data successfully imported!');
    process.exit();
  } catch (error) {
    logger.error(`Error importing data: ${error.message}`);
    process.exit(1);
  }
};

/**
 * Destroy data in database
 */
const destroyData = async () => {
  try {
    logger.info('Starting data destruction process...');

    await Dataset.deleteMany();
    await Conflict.deleteMany();
    logger.info('✅ All data completely destroyed!');

    process.exit();
  } catch (error) {
    logger.error(`Error destroying data: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  destroyData();
} else {
  logger.warn('Please provide a flag: -i to import, -d to destroy');
  process.exit(1);
}
