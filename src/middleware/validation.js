const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("fullName")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Full name can not be empty!")
    .bail(),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("email cannot be empty!")
    .isEmail()
    .withMessage("Invalid email address")
    .normalizeEmail()
    .withMessage("Invalid email address!")
    .bail(),
  check("phoneNo")
    .trim()
    .optional({ checkFalsy: true })
    .not()
    .isEmpty()
    //   .isMobilePhone(["en-US", "en-IN"])
    //   .withMessage("Invalid phone number, phone must from US or In")
    .bail(),
  check("message")
    .trim()
    .not()
    .isEmpty()
    .withMessage("message cannot be empty!"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
