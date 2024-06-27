const { body, param, validationResult } = require("express-validator");
const currentYear = new Date().getFullYear();
const moment = require("moment");

//validate Register
const validateCreateMember = [
  body("memberName")
    .isLength({ min: 5 })
    .withMessage("memberName must be at least 5 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain only letters and spaces"),
  body("yob")
    .isNumeric()
    .withMessage("Year of birth must be a number")
    .isLength({ min: 4, max: 4 })
    .withMessage("Year of birth must be 4 digits long")
    .custom((value) => {
      const age = currentYear - value;
      if (age < 18) {
        throw new Error("You must be at least 18 years old");
      }
      return true;
    })
    .withMessage("You must be at least 18 years old"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((error) => error.msg);
      return res.status(400).json(messages);
    }
    next();
  },
];
//validate Login
const validateLogin = [
  body("memberName")
    .isLength({ min: 5 })
    .withMessage("memberName must be at least 5 characters long"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((error) => error.msg);
      return res.status(400).json(messages);
    }
    next();
  },
];
//validate UpdateMember
const validateUpdateMember = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name must contain only letters and spaces"),
  body("yob")
    .matches(/^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
    .withMessage("yob must be in the format YYYY-MM-DD")
    .custom((value) => {
      if (moment(value).isAfter(moment())) {
        throw new Error("Date of birth cannot be in the future");
      }
      if (moment().diff(moment(value), "years") < 18) {
        throw new Error("You must be at least 18 years old");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((error) => error.msg);
      return res.status(400).json(messages);
    }
    next();
  },
];
// validate ChangePassword
const validateChangePassword = [
  body("memberName")
    .isLength({ min: 5 })
    .withMessage("memberName must be at least 5 characters long"),
  body("oldPassword")
    .isLength({ min: 6 })
    .withMessage("Old Password must be at least 6 characters long"),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New password must be at least 6 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((error) => error.msg);
      return res.status(400).json(messages);
    }
    next();
  },
];
//validate getMemberName
validateGetByMemberName = [
  param("memberName")
    .notEmpty()
    .withMessage("memberName is required")
    .isLength({ min: 5 })
    .withMessage("memberName must be at least 5 characters long"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((error) => error.msg);
      return res.status(400).json(messages);
    }
    next();
  },
];
//validate createBrand
const validateCreateBrand = [
  body("brandName")
    .not()
    .isEmpty()
    .withMessage("Brand name is required")
    .isLength({ min: 2 })
    .withMessage("Brand name must be at least 2 characters long"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((error) => error.msg);
      return res.status(400).json(messages);
    }
    next();
  },
];
//create Watches
const validateWatch = [
  body("watchName")
    .not()
    .isEmpty()
    .withMessage("Watch name is required")
    .isLength({ min: 2 })
    .withMessage("Watch name must be at least 2 characters long"),
  body("price")
    .not()
    .isEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be a number"),
  body("Automatic")
    .optional()
    .isBoolean()
    .withMessage("Automatic must be a boolean"),
  body("watchDescription")
    .not()
    .isEmpty()
    .withMessage("Watch description is required")
    .isLength({ min: 5 })
    .withMessage("Watch description must be at least 5 characters long"),
  body("brand").not().isEmpty().withMessage("Brand is required"),
  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: messages });
    }
    next();
  },
];
const validateComment = [
  body("rating")
    .not()
    .isEmpty()
    .withMessage("Rating is required")
    .isNumeric()
    .withMessage("Rating must be a number")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  body("content")
    .not()
    .isEmpty()
    .withMessage("Content is required")
    .isLength({ min: 1 })
    .withMessage("Content must be at least 1 character long"),
  body("author").not().isEmpty().withMessage("Author is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const messages = errors.array().map((error) => error.msg);
      return res.status(400).json(messages);
    }
    next();
  },
];

const middleWareValidation = {
  validateCreateMember,
  validateLogin,
  validateUpdateMember,
  validateChangePassword,
  validateGetByMemberName,
  validateCreateBrand,
  validateWatch,
  validateComment,
};

module.exports = middleWareValidation;
