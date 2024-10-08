const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Categor", categorySchema);
module.exports = Category;
