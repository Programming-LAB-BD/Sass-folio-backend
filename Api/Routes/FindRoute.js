const router = require("express").Router();
const {
  findEmailOnCreateUser,
  findUsernameOnCreateUser,
  findProfileOnRedirectToDashboard,
} = require("../Controllers/FindController");

router.post("/email", findEmailOnCreateUser);

router.post("/username", findUsernameOnCreateUser);

router.post("/profile", findProfileOnRedirectToDashboard);

module.exports = router;
