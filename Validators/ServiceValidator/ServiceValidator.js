const { body } = require("express-validator");

module.exports = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name can't be Empty. Please fill this Name input")
    .trim(),
  body("icon")
    .not()
    .isEmpty()
    .withMessage("Icon can't be Empty. Please fill this Icon input")
    .trim(),
  body("description")
    .not()
    .isEmpty()
    .withMessage(
      "Description can't be Empty. Please fill this Description input"
    )
    .isLength({ min: 50 })
    .withMessage("Description must be greater than 50 charecters")
    .trim(),
];
