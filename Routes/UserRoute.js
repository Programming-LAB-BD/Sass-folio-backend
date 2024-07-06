const router = require("express").Router();

const { CreateUserPostController } = require("../Controllers/UserController");

router.post("/create", CreateUserPostController);

module.exports = router;
