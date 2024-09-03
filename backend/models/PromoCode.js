const mongoose = require("mongoose");

const promoCodeSchema = new mongoose.Schema(
  {
    promoCode: {
      type: String,
      required: true,
      unique: true,
    },
    discountPercent: {
      type: Number,
      required: true,
    },
    expireAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  { timestamps: true }
);

const PromoCode = mongoose.model("PromoCode", promoCodeSchema);
module.exports = PromoCode;
