const router = require("express").Router();
const {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
  getCategoryCtrl,
} = require("../controllers/categoryCtrl");
const validateObjectId = require("../middlewares/validateObjectId");
const verifyToken = require("../middlewares/verifyAndRefreshTokens");

router
  .route("/")
  .post(verifyToken, createCategoryCtrl)
  .get(getAllCategoriesCtrl);

router
  .route("/:id")
  .get(verifyToken, validateObjectId, getCategoryCtrl)
  .put(verifyToken, validateObjectId, updateCategoryCtrl)
  .delete(verifyToken, validateObjectId, deleteCategoryCtrl);

module.exports = router;
