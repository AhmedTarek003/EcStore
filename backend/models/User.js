const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profilePic: {
      type: Object,
      default: {
        url: null,
        publicId: null,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    favoriteProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        default: null,
      },
    ],
    purshasesHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        default: null,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
