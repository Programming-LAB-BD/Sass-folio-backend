const { body } = require("express-validator");

module.exports = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name can't be Empty. Please fill this Name input")
    .trim(),
  body("image")
    .not()
    .isEmpty()
    .withMessage("Image/Icon can't be Empty. Please fill this Image/Icon input")
    .trim(),
  body("description")
    .not()
    .isEmpty()
    .withMessage(
      "Description can't be Empty. Please fill this Description input"
    )
    .isLength({ min: 100 })
    .withMessage("Description must be greater than 100 charecters")
    .trim(),
];
