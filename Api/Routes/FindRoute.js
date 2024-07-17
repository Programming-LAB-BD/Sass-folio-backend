const router = require("express").Router();
const {
  findEmailOnCreateUser,
  findUsernameOnCreateUser,
} = require("../Controllers/FindController");

router.post("/email", findEmailOnCreateUser);

router.post("/username", findUsernameOnCreateUser);

module.exports = router;
