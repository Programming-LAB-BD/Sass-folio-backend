const router = require("express").Router();

// Import Validators here
const UserValidator = require("../Validators/UserValidator/UserValidator");

// Import Controllers here
const {
  CreateUserPostController,
  LoginUserPostController,
} = require("../Controllers/UserController");

router.post("/create", UserValidator, CreateUserPostController);

router.post("/login", LoginUserPostController);

module.exports = router;
