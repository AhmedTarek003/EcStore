const { check } = require("express-validator");
const validate = require("../../middlewares/validatorMiddleware");

exports.createProductValidatior = [
  check("productName").notEmpty().withMessage("Product Name is required"),
  check("category").notEmpty().withMessage("Category is required"),
  check("price").notEmpty().withMessage("Price is required"),
  check("stock").notEmpty().withMessage("Stock is required"),
  validate,
];
