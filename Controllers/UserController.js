const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const { validationResult } = require("express-validator");
const validationErrorFormatter = require("../utils/validationErrorFormatter");

async function loginFunctionality(data, res, req) {
  const jwtToken = jwt.sign(
    {
      id: data._id,
    },
    process.env.SECRET_KEY
  );

  res.cookie("saas-folio", jwtToken, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.status(201).json({
    message: "Login successfully.",
    logedIn: true,
    jwtToken,
  });
  return;
}

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
      loginFunctionality(createdUser, res, req);
    } else {
      res.status(400).json({
        error: "Creating User Error Occurred.",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.LoginUserPostController = async (req, res, next) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "Wrong email or password.",
      });
    }

    let matchedPassword = await bcrypt.compare(password, user.password);

    if (!matchedPassword) {
      return res.status(400).json({
        message: "Wrong email or password.",
      });
    }

    loginFunctionality(user, res, req);
  } catch (err) {
    next(err);
  }
};
