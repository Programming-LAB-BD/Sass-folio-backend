const Showcase = require("../Models/Showcase");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const validationErrorFormatter = require("../utils/validationErrorFormatter");

exports.FetchSitePostController = async (req, res, next) => {
  let token = req.body.token;
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(400).json({
        message: "Authentication Faild.",
      });
    }

    let showcase = await Showcase.findOne({ user: decoded.id });

    if (!showcase) {
      return res.status(400).json({
        message: "Site not found.",
      });
    }

    res.status(201).json(showcase);
  } catch (err) {
    console.log(err);
  }
};

exports.CreateSitePostController = async (req, res, next) => {
  let {
    name,
    title,
    description,
    introduction,
    aboutText,
    address,
    phone,
    contactEmail,
    token,
  } = req.body;

  let errors = validationResult(req).formatWith(validationErrorFormatter);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.mapped(),
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    let user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(400).json({
        message: "Authentication Faild.",
      });
    }

    let showcase = new Showcase({
      name,
      title,
      description,
      introduction,
      aboutText,
      address,
      phone,
      contactEmail,
      user: user._id,
    });

    let createditem = await showcase.save();

    if (createditem) {
      await User.findOneAndUpdate(
        { _id: decoded.id },
        { $set: { showcase: createditem._id } },
        { new: true }
      );

      res.status(201).json({
        message: "Site Created Successfully.",
        data: createditem,
        created: true,
      });
    } else {
      res.status(500).json({
        message: "Creating Site Error Occurred.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.UpdateSitePostController = async (req, res, next) => {
  let {
    name,
    title,
    description,
    introduction,
    facebook,
    instagram,
    twitter,
    github,
    linkedin,
    aboutText,
    skills,
    address,
    phone,
    contactEmail,
    token,
  } = req.body;

  let errors = validationResult(req).formatWith(validationErrorFormatter);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.mapped(),
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    let updateditem = await Showcase.findOneAndUpdate(
      { user: decoded.id },
      {
        $set: {
          name,
          title,
          description,
          introduction,
          facebook,
          instagram,
          twitter,
          github,
          linkedin,
          aboutText,
          skills,
          address,
          phone,
          contactEmail,
        },
      },
      { new: true }
    );

    if (updateditem) {
      res.status(200).json({
        message: "Site Update Successfully.",
        updateditem,
        updated: true,
      });
    } else {
      res.status(500).json({
        message: "Creating Site Error Occurred.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
