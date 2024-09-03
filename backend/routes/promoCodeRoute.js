const router = require("express").Router();
const {
  createPromoCodeCtrl,
  deletePromoCode,
  getAllPromoCodeCtrl,
  getPromoCodeCtrl,
} = require("../controllers/promoCodeCtrl");
const validateObjectId = require("../middlewares/validateObjectId");
const verifyToken = require("../middlewares/verifyAndRefreshTokens");

router
  .route("/")
  .post(verifyToken, createPromoCodeCtrl)
  .get(verifyToken, getAllPromoCodeCtrl);
router.delete("/:id", verifyToken, validateObjectId, deletePromoCode);
router.post("/get_promo_code", verifyToken, getPromoCodeCtrl);

module.exports = router;
