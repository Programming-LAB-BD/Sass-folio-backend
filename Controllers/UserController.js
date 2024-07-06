const User = require("../Models/User");

exports.CreateUserPostController = async (req, res, next) => {
  let { name, username, email, password } = req.body;

  try {
    let user = new User({
      name,
      username,
      email,
      password,
    });

    let createdUser = await user.save();

    res.status(201).json(createdUser);
  } catch (err) {
    console.log(err);
  }
};
