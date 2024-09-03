const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MONGO IS CONNECTED");
  } catch (error) {
    console.error(`Error connecting with MongoDB + ${error.message}`);
  }
};

module.exports = connectMongoDB;
