const router = require("express").Router();
const { stripCtrl } = require("../controllers/stripeCtrl");

router.post("/create_checkout_session", stripCtrl);

module.exports = router;
