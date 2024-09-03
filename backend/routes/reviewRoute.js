const router = require("express").Router();
const { addReviewCtrl } = require("../controllers/reviewCtrl");
const validateObjectId = require("../middlewares/validateObjectId");
const verifyToken = require("../middlewares/verifyAndRefreshTokens");

router.post("/:id/add_review", verifyToken, validateObjectId, addReviewCtrl);

module.exports = router;
