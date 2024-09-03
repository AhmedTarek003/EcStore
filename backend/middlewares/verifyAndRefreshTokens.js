const jwt = require("jsonwebtoken");
// const generateTokenAndCookie = require("../utils/generateTokenAndCookies");

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.at;
  if (accessToken) {
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(400).json({ msg: "Invalid token" });
    }
    req.user = decoded;
    next();
  } else {
    const refreshToken = req.cookies.rt;
    if (!refreshToken) {
      return res.status(404).json({ msg: "no refresh token" });
    } else {
      jwt.verify(refreshToken, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(400).json({ msg: "Invalid token" });
        } else {
          const accessToken = jwt.sign(
            { _id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "1d" }
          );
          res.cookie("at", accessToken, { maxAge: 1 * 24 * 60 * 60 * 1000 });
          req.user = user;
          next();
        }
      });
    }
  }
};

module.exports = verifyToken;
