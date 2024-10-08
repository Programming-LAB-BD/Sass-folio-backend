const User = require("../../Models/User");
const jwt = require("jsonwebtoken");

exports.findEmailOnCreateUser = async (req, res, next) => {
  let { email } = req.body;

  try {
    let getEmail = await User.findOne({ email });

    if (getEmail) {
      return res.status(200).json({
        availability: false,
        message: "Email alredy used.",
      });
    }

    res.status(200).json({
      availability: true,
      message: "Email is available.",
    });
  } catch (err) {
    next(err);
  }
};

exports.findUsernameOnCreateUser = async (req, res, next) => {
  let { username } = req.body;

  try {
    let getUsername = await User.findOne({ username });

    if (getUsername) {
      return res.status(200).json({
        availability: false,
        message: "Username alredy used.",
      });
    }

    res.status(200).json({
      availability: true,
      message: "Username is available.",
    });
  } catch (err) {
    next(err);
  }
};

exports.findProfileOnRedirectToDashboard = async (req, res, next) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    let profile = await User.findOne({ _id: decoded.id });

    if (profile.showcase) {
      res.status(200).json({
        message: "Profile found.",
        profile,
      });
    } else {
      res.status(200).json({
        message: "Profile not found.",
        profile: false,
      });
    }
  } catch (err) {
    next(err);
  }
};
