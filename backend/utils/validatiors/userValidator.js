const { check } = require("express-validator");
const validate = require("../../middlewares/validatorMiddleware");

exports.signUpUserValidator = [
  check("fullname").notEmpty().withMessage("Fullname is required"),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invaid email address"),
  check("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("invalid phone number"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  check("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("imvalid phone number"),
  validate,
];
exports.updateUserValidator = [
  check("fullname").optional(),
  check("email").optional().isEmail().withMessage("Invaid email address"),
  check("phoneNumber")
    .optional()
    .isMobilePhone()
    .withMessage("invalid phone number"),
  check("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("password must be at least 6 characters"),
  check("phoneNumber")
    .optional()
    .isMobilePhone()
    .withMessage("imvalid phone number"),
  validate,
];
