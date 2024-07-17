const { body } = require("express-validator");
const User = require("../../Models/User");

module.exports = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Name can't be Empty. Please fill this Name input")
    .isLength({
      min: 6,
    })
    .withMessage("Name Must Be Greater Than 6 Characters"),
  body("username")
    .not()
    .isEmpty()
    .withMessage("username can't be Empty. Please fill this username input")
    .custom(async (value) => {
      let user = await User.findOne({ username: value });
      if (user) {
        return Promise.reject("Username Already Used.");
      }
      return true;
    })
    .isLength({
      min: 6,
    })
    .withMessage("Username Must Be Greater Than 6 Characters"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email can't be Empty. Please fill this Email input")
    .normalizeEmail()
    .isEmail()
    .withMessage("Please Provide A Valid Email")
    .custom(async (email) => {
      let user = await User.findOne({ email });
      if (user) {
        return Promise.reject("Email Already Used");
      }

      return true;
    }),
  body("password")
    .isLength({
      min: 8,
    })
    .withMessage("Password Must Be Greater Than 8 Characters"),
  body("confirmPassword")
    .isLength({
      min: 8,
    })
    .withMessage("Password Must Be Greater Than 8 Characters")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password Dosn't Match");
      }

      return true;
    }),
];
