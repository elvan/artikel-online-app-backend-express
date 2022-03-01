const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const MONGODB_SERVER =
  process.env.MONGODB_SERVER || 'mongodb://localhost:27017/artikel-online-app';

const connectToDatabase = async () => {
  try {
    const defaultConnection = await mongoose.connect(MONGODB_SERVER);
    console.log(`Connected to ${defaultConnection.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to database: ${error}`);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
