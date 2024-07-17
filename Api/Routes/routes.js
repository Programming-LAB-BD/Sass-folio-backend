const router = require("express").Router();
const FindRoute = require("./FindRoute");

router.use("/find", FindRoute);

module.exports = router;
