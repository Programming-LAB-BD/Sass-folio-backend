const router = require("express").Router();

// Import Validator here
const PortfolioValidator = require("../Validators/PortfolioValidator/PortfolioValidator");

// Import Controller here
const {
  PortfolioFetchPostController,
  PortfolioCreatePostController,
  PortfolioDeletePostController,
} = require("../Controllers/PortfolioController");

router.post("/", PortfolioFetchPostController);

router.post("/create", PortfolioValidator, PortfolioCreatePostController);

router.post("/delete", PortfolioDeletePostController);

module.exports = router;
