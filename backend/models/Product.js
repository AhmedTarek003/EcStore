const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productImages: [
      {
        url: String,
        publicId: String,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    colors: [
      {
        type: String,
        default: null,
      },
    ],
    size: [
      {
        type: String,
        default: null,
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
