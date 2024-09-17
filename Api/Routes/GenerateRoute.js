const router = require("express").Router();
const {
  GenerateImageUrlPostController,
} = require("../Controllers/GenerateController");

router.post("/image", GenerateImageUrlPostController);

module.exports = router;
