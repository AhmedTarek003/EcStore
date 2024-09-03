const asyncHandler = require("express-async-handler");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { uploadImageToCloudinary } = require("../utils/cloudinary");
const path = require("path");
const fs = require("fs");
const generateTokenAndCookie = require("../utils/generateTokenAndCookies");

exports.signUpCtrl = asyncHandler(async (req, res) => {
  const { fullname, email, phoneNumber, password, isAdmin } = req.body;

  const existUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
  if (existUser) {
    return res.status(400).json({ msg: "User already exists" });
  }

  // upload image
  const image = req.file?.filename;
  const imagePath = path.join(__dirname, `../images/${image}`);
  let result;
  if (image) {
    result = await uploadImageToCloudinary(imagePath);
  }
  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    fullname,
    email,
    phoneNumber,
    password: hashPassword,
    profilePic: {
      url: image ? result.url : null,
      publicId: image ? result.public_id : null,
    },
    isAdmin,
  });

  generateTokenAndCookie(res, newUser);

  res.status(201).json({
    _id: newUser._id,
    fullname: newUser.fullname,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
    profilePic: newUser.profilePic,
  });

  if (image) {
    fs.unlinkSync(imagePath);
  }
});

exports.loginCtrl = asyncHandler(async (req, res) => {
  const { emailOrphoneNumber, password } = req.body;

  if (!emailOrphoneNumber || !password)
    return res.status(400).json({ msg: "No Filleds" });

  const user = await User.findOne({
    $or: [{ email: emailOrphoneNumber }, { phoneNumber: emailOrphoneNumber }],
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ msg: "Incorrect data" });
  }

  generateTokenAndCookie(res, user);

  res.status(200).json({
    _id: user._id,
    fullname: user.fullname,
    email: user.email,
    isAdmin: user.isAdmin,
    profilePic: user.profilePic,
  });
});

exports.logoutCtrl = asyncHandler(async (req, res) => {
  res.cookie("at", "", { maxAge: 0 });
  res.cookie("rt", "", { maxAge: 0 });
  res.status(200).json({ msg: "logged out successfully" });
});
