const router = require("express").Router();

// Import Validator here
const PortfolioValidator = require("../Validators/PortfolioValidator/PortfolioValidator");

// Import Controller here
const {
  PortfolioCreatePostController,
} = require("../Controllers/PortfolioController");

router.post("/create", PortfolioValidator, PortfolioCreatePostController);

module.exports = router;
