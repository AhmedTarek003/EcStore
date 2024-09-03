const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");
const Review = require("../models/Review");

exports.addReviewCtrl = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id: productId } = req.params;
  const { rating } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ msg: "Product not found" });

  const existReview = await Review.findOne({
    $and: [{ productId }, { userId }],
  });
  let review;
  if (existReview) {
    review = await Review.findByIdAndUpdate(
      existReview._id,
      {
        $set: {
          rating,
        },
      },
      { new: true }
    );
  } else {
    review = new Review({
      productId,
      userId,
      rating,
    });
    await review.save();
  }

  const stats = await Review.aggregate([
    {
      $group: {
        _id: "$productId",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  await Product.findByIdAndUpdate(
    productId,
    {
      $set: {
        rating: stats[0].avgRating,
      },
    },
    { new: true }
  );
  res.status(201).json(review);
});
