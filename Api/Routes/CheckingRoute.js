const router = require("express").Router();

const { CheckingAuthentication } = require("../Controllers/CheckingController");

router.post("/authentication", CheckingAuthentication);

module.exports = router;
