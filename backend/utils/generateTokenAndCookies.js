const jwt = require("jsonwebtoken");

const generateTokenAndCookie = (res, user) => {
  const accessToken = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" }
  );
  const refreshToken = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  );
  res.cookie("at", accessToken, { maxAge: 1 * 24 * 60 * 60 * 1000 });
  res.cookie("rt", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};

module.exports = generateTokenAndCookie;
