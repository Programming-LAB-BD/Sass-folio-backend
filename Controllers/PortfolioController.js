const Portfolio = require("../Models/Portfolio");
const { validationResult } = require("express-validator");
const validationErrorFormatter = require("../utils/validationErrorFormatter");
const jwt = require("jsonwebtoken");
const Showcase = require("../Models/Showcase");
const { firebaseConfig } = require("../firebase");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, deleteObject } = require("firebase/storage");

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

exports.PortfolioFetchPostController = async (req, res, next) => {
  let { id } = req.body;

  try {
    let portfolio = await Portfolio.findOne({ _id: id });

    if (portfolio) {
      res.status(200).json(portfolio);
    } else {
      res.status(200).json({
        message: "Portfolio not found.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.PortfolioCreatePostController = async (req, res, next) => {
  let { name, thumbnail, description, token } = req.body;

  if (!token) {
    return res.json({
      message: "Authentication Faild.",
    });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let errors = validationResult(req).formatWith(validationErrorFormatter);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.mapped(),
    });
  }

  try {
    let showcase = await Showcase.findOne({ user: decoded.id });

    if (!showcase) {
      return res.status(500).json({
        message: "Site not found",
      });
    }

    let portfolio = new Portfolio({
      name,
      thumbnail,
      description,
      showcase: showcase._id,
      user: decoded.id,
    });

    let createdPortfolio = await portfolio.save();

    let updateShowcase = await Showcase.findOneAndUpdate(
      { _id: showcase._id },
      {
        $push: {
          portfolio: createdPortfolio._id,
        },
      },
      { new: true }
    );

    if (updateShowcase) {
      res.status(201).json(createdPortfolio);
    } else {
      res.status(500).json({
        message:
          "Portfolio Created. but Updating your Showcase Error Occurred.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.PortfolioDeletePostController = async (req, res, next) => {
  let { token, id } = req.body;

  if (!token) {
    return res.json({
      message: "Authentication Faild.",
    });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  try {
    let showcase = await Showcase.findOne({ user: decoded.id, portfolio: id });

    if (!showcase) {
      return res.status(200).json({
        message: "Showcase not found.",
      });
    }

    let updatedShowcase = await Showcase.findOneAndUpdate(
      { _id: showcase._id },
      {
        $pull: {
          portfolio: id,
        },
      },
      { new: true }
    );

    if (!updatedShowcase) {
      return res.status(200).json({
        message: "Deleteing site error occoured!",
      });
    }

    let currentPortfolio = await Portfolio.findOne({ _id: id });

    if (!currentPortfolio) {
      return res.status(200).json({
        message: "Portfolio not found.",
      });
    }

    // Delete the icon here
    await deleteObject(ref(storage, currentPortfolio.thumbnail));

    let deletedPortfolio = await Portfolio.findOneAndDelete({ _id: id });

    if (deletedPortfolio) {
      res.status(200).json({
        message: "Portfolio deleting successfull.",
        delete: true,
      });
    } else {
      res.status(200).json({
        message: "Portfolio not found.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
