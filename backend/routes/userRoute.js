const router = require("express").Router();
const {
  getAllUsersCtrl,
  getUserCtrl,
  updateUserCtrl,
  updateUserPicCtrl,
  deleteUserCtrl,
  toggleProductsLikes,
} = require("../controllers/userCtrl");
const uploadImage = require("../middlewares/uploadImage");
const validateObjectId = require("../middlewares/validateObjectId");
const verifyToken = require("../middlewares/verifyAndRefreshTokens");
const { updateUserValidator } = require("../utils/validatiors/userValidator");

router.get("/", verifyToken, getAllUsersCtrl);
router.get("/get_user", verifyToken, getUserCtrl);
router
  .route("/:id")
  .put(verifyToken, validateObjectId, updateUserValidator, updateUserCtrl)
  .delete(verifyToken, validateObjectId, deleteUserCtrl);
router.put(
  "/user_pic/:id",
  verifyToken,
  validateObjectId,
  uploadImage.single("image"),
  updateUserPicCtrl
);
router.put(
  "/:id/favorite_Products",
  verifyToken,
  validateObjectId,
  toggleProductsLikes
);

module.exports = router;
