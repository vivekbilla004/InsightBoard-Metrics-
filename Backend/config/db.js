const mongoose = require("mongoose");
MONGO_URL = "mongodb://127.0.0.1:27017/insightboard";
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
