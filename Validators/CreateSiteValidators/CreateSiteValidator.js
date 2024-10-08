const { body } = require("express-validator");

module.exports = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name can't be Empty. Please fill this Name input")
    .trim(),
  body("title")
    .not()
    .isEmpty()
    .withMessage("Title can't be Empty. Please fill this Title input")
    .isLength({ max: 30 })
    .withMessage("Title can't be greater than 30 charecters.")
    .trim(),
  body("description")
    .not()
    .isEmpty()
    .withMessage(
      "Description can't be Empty. Please fill this Description input"
    )
    .isLength({ max: 500 })
    .withMessage("Description can't be Greater than 500 characters.")
    .trim(),
  body("introduction")
    .not()
    .isEmpty()
    .withMessage(
      "introduction can't be Empty. Please fill this introduction input"
    )
    .isLength({ min: 200, max: 1000 })
    .withMessage("Description must be 200-1000 charecters.")
    .trim(),
  body("aboutText")
    .not()
    .isEmpty()
    .withMessage(
      "About Description can't be Empty. Please fill this AboutText input"
    )
    .isLength({ min: 700 })
    .withMessage("About Description must be greater than 700 charecters.")
    .trim(),
  body("address").trim(),
  body("phone").trim(),
  body("facebook").trim(),
  body("instagram").trim(),
  body("twitter").trim(),
  body("github").trim(),
  body("linkedin").trim(),
  body("contactEmail")
    .not()
    .isEmpty()
    .withMessage(
      "Contact Email can't be Empty. Please fill this ContactEmail input"
    )
    .normalizeEmail()
    .isEmail()
    .withMessage("Please type a valid Email Address.")
    .trim(),
];
