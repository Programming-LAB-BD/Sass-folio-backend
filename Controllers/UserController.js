const bcrypt = require("bcrypt");
const User = require("../Models/User");
const { validationResult } = require("express-validator");
const validationErrorFormatter = require("../utils/validationErrorFormatter");

exports.CreateUserPostController = async (req, res, next) => {
  let { name, username, email, password } = req.body;
  let errors = validationResult(req).formatWith(validationErrorFormatter);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.mapped(),
    });
  }

  try {
    let hashedPassword = await bcrypt.hash(password, 11);
    let user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    let createdUser = await user.save();

    if (createdUser) {
      res.status(201).json(createdUser);
    } else {
      res.status(400).json({
        error: "Creating User Error Occurred.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
