const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

module.exports = {
  validate,
};
