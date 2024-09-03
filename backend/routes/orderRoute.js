const router = require("express").Router();
const {
  createOrderCtrl,
  getAllOrdersCtrl,
  getOrderCtrl,
  getSalesCtrl,
  getSalesOfDayCtrl,
} = require("../controllers/orderCtrl");
const validateObjectId = require("../middlewares/validateObjectId");
const verifyToken = require("../middlewares/verifyAndRefreshTokens");

router
  .route("/")
  .post(verifyToken, createOrderCtrl)
  .get(verifyToken, getAllOrdersCtrl);

router.get("/get_sales", verifyToken, getSalesCtrl);
router.get("/get_sales_of_day", verifyToken, getSalesOfDayCtrl);
router.get("/:id", verifyToken, validateObjectId, getOrderCtrl);

module.exports = router;
