const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  // sequential processing, stops running validations chain if one fails.
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(404).json({ err: err.array()[0].msg });
  }

  next();
};

module.exports = validate;
