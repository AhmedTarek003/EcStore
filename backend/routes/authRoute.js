const router = require("express").Router();
const {
  signUpCtrl,
  loginCtrl,
  logoutCtrl,
} = require("../controllers/authCtrl");
const uploadImage = require("../middlewares/uploadImage");
const { signUpUserValidator } = require("../utils/validatiors/userValidator");

router.post(
  "/signup",
  uploadImage.single("image"),
  signUpUserValidator,
  signUpCtrl
);

router.post("/login", loginCtrl);
router.post("/logout", logoutCtrl);

module.exports = router;
