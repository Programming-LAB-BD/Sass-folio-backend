const router = require("express").Router();

// Import Validator here
const ServiceValidator = require("../Validators/ServiceValidator/ServiceValidator");

// Import Controller here
const {
  ServiceCreatePostController,
} = require("../Controllers/ServiceController");

router.post("/create", ServiceValidator, ServiceCreatePostController);

module.exports = router;
