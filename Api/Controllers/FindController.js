const User = require("../../Models/User");

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
