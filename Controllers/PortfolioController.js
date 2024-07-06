const Portfolio = require("../Models/Portfolio");
const { validationResult } = require("express-validator");
const validationErrorFormatter = require("../utils/validationErrorFormatter");

exports.PortfolioCreatePostController = async (req, res, next) => {
  let { description } = req.body;
  let errors = validationResult(req).formatWith(validationErrorFormatter);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.mapped(),
    });
  }

  try {
    let portfolio = new Portfolio({ description });

    let createdPortfolio = await portfolio.save();

    if (createdPortfolio) {
      res.status(201).json(createdPortfolio);
    } else {
      res.status(500).json({
        message: "Creating Site Error Occurred.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
