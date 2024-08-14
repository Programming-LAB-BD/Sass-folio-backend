const router = require("express").Router();
const FindRoute = require("./FindRoute");
const CheckingRoute = require("./CheckingRoute");

router.use("/find", FindRoute);

router.use("/check", CheckingRoute);

module.exports = router;
