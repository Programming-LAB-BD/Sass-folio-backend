const router = require("express").Router();

// Import Validator here
const ServiceValidator = require("../Validators/ServiceValidator/ServiceValidator");

// Import Controller here
const {
  ServiceCreatePostController,
  ServiceFetchPostController,
  ServiceDeletePostController,
} = require("../Controllers/ServiceController");

router.post("/", ServiceFetchPostController);

router.post("/create", ServiceValidator, ServiceCreatePostController);

router.post("/delete", ServiceDeletePostController);

module.exports = router;
