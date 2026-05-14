// Database connection configuration can go here
const connectDB = async () => {
  try {
    // Add your database connection logic here
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
