const router = require("express").Router();
const FindRoute = require("./FindRoute");
const CheckingRoute = require("./CheckingRoute");
const GenerateRoute = require("./GenerateRoute");

router.use("/find", FindRoute);

router.use("/check", CheckingRoute);

router.use("/generate", GenerateRoute);

module.exports = router;
