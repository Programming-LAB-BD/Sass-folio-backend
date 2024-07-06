const Showcase = require("../Models/Showcase");
const { validationResult } = require("express-validator");
const validationErrorFormatter = require("../utils/validationErrorFormatter");

exports.FetchSiteGetController = async (req, res, next) => {
  try {
    let showcase = await Showcase.findById("6688f13eff00f9f86707d003");

    res.status(201).json(showcase);
  } catch (err) {
    console.log(err);
  }
};

exports.CreateSitePostController = async (req, res, next) => {
  let { name, title, description, introduction, aboutText, contactEmail } =
    req.body;
  let errors = validationResult(req).formatWith(validationErrorFormatter);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.mapped(),
    });
  }

  try {
    let showcase = new Showcase({
      name,
      title,
      description,
      introduction,
      aboutText,
      contactEmail,
    });

    let createditem = await showcase.save();

    if (createditem) {
      res.status(201).json(createditem);
    } else {
      res.status(500).json({
        message: "Creating Site Error Occurred.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
