const router = require("express").Router();

// Import Validators here
const UserValidator = require("../Validators/UserValidator/UserValidator");

// Import Controllers here
const { CreateUserPostController } = require("../Controllers/UserController");

router.post("/create", UserValidator, CreateUserPostController);

module.exports = router;
