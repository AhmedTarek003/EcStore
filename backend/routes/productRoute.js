const router = require("express").Router();
const {
  createProductCtrl,
  getAllProductsCtrl,
  getProductCtrl,
  updateProductCtrl,
  deleteProductCtrl,
  updateProductImagesCtrl,
} = require("../controllers/ProductCtrl");
const uploadImage = require("../middlewares/uploadImage");
const validateObjectId = require("../middlewares/validateObjectId");
const verifyToken = require("../middlewares/verifyAndRefreshTokens");
const {
  createProductValidatior,
} = require("../utils/validatiors/productValidator");

router
  .route("/")
  .post(
    verifyToken,
    uploadImage.array("images", 5),
    createProductValidatior,
    createProductCtrl
  )
  .get(getAllProductsCtrl);

router
  .route("/:id")
  .get(validateObjectId, getProductCtrl)
  .put(verifyToken, validateObjectId, updateProductCtrl)
  .delete(verifyToken, validateObjectId, deleteProductCtrl);

router.put(
  "/update_product_img/:id",
  verifyToken,
  validateObjectId,
  uploadImage.array("images", 5),
  updateProductImagesCtrl
);

module.exports = router;
