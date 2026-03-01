const mongoose = require("mongoose");

// Function to connect MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONN_STRING);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to database", error);
    process.exit(1); // Stop server if DB fails
  }
};

module.exports = connectDB;
