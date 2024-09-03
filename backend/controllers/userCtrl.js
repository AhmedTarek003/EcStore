const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const {
  uploadImageToCloudinary,
  removeImagefromCludinary,
} = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const Product = require("../models/Product");

exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const { isAdmin } = req.user;
  if (!isAdmin) return res.status(403).json({ msg: "access denied" });
  const users = await User.find({}, { password: 0, favoriteProducts: 0 });
  res.status(200).json(users);
});

exports.getUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  const user = await User.findById(userId).select("-password");
  if (!user) return res.status(404).json({ msg: "no user found" });
  res.status(200).json(user);
});

exports.updateUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { fullname, email, password, phoneNumber } = req.body;
  const userId = req.user._id;

  if (userId !== id) return res.status(403).json({ msg: "access denied" });
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ msg: "no user found" });
  const existEmail = await User.findOne({ email });
  const existPhone = await User.findOne({ phoneNumber });

  if (
    (existEmail && existEmail.email !== user.email) ||
    (existPhone && existPhone.phoneNumber !== user.phoneNumber)
  ) {
    return res.status(400).json({ msg: "user already exists" });
  }

  // hash password
  let hashPassword;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        fullname,
        email,
        phoneNumber,
        password: password ? hashPassword : password,
      },
    },
    { new: true }
  );
  res.status(200).json({
    _id: updatedUser._id,
    fullname: updatedUser.fullname,
    email: updatedUser.email,
    phoneNumber: updatedUser.phoneNumber,
    isAdmin: updatedUser.isAdmin,
    profilePic: updatedUser.profilePic,
  });
});

exports.updateUserPicCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (userId !== id) return res.status(403).json({ msg: "access denied" });
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ msg: "no user found" });
  // upload image
  const image = req.file?.filename;
  const imagePath = path.join(__dirname, `../images/${image}`);
  let result;
  if (image) {
    if (user.profilePic.publicId)
      await removeImagefromCludinary(user.profilePic.publicId);
    result = await uploadImageToCloudinary(imagePath);
  }
  const updatedUserPic = await User.findByIdAndUpdate(
    id,
    {
      $set: {
        profilePic: {
          url: image ? result.url : null,
          publicId: image ? result.public_id : null,
        },
      },
    },
    { new: true }
  );
  res.status(200).json({
    _id: updatedUserPic._id,
    fullname: updatedUserPic.fullname,
    email: updatedUserPic.email,
    phoneNumber: updatedUserPic.phoneNumber,
    isAdmin: updatedUserPic.isAdmin,
    profilePic: updatedUserPic.profilePic,
  });
  if (image) {
    fs.unlinkSync(imagePath);
  }
});

exports.deleteUserCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isAdmin } = req.user;
  const { _id } = req.user;
  if (!isAdmin) return res.status(403).json({ msg: "access denied" });
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ msg: "no user found" });
  if (_id === user?._id.toString())
    return res.status(403).json({ msg: "you cant't delete yourself" });
  if (user.profilePic.publicId) {
    await removeImagefromCludinary(user.profilePic.publicId);
  }
  await User.findByIdAndDelete(id);
  res.status(200).json(user);
});

exports.toggleProductsLikes = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { id: productId } = req.params;

  const existProduct = await Product.findById(productId);
  if (!existProduct) return res.status(404).json({ msg: "product not found" });
  let user = await User.findById(userId);

  const isProductLiked = user.favoriteProducts.find(
    (product) => product.toString() === productId
  );
  if (isProductLiked) {
    user = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          favoriteProducts: productId,
        },
      },
      { new: true }
    ).select("-password");
  } else {
    user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          favoriteProducts: productId,
        },
      },
      { new: true }
    ).select("-password");
  }
  res.status(200).json(user);
});
