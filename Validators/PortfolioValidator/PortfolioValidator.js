const { body } = require("express-validator");

module.exports = [
  body("description")
    .not()
    .isEmpty()
    .withMessage(
      "Description can't be Empty. Please fill this Description input"
    )
    .isLength({ min: 200 })
    .withMessage("Description must be greater than 200 charecters")
    .trim(),
];
