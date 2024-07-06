const router = require("express").Router();

const CreateSiteValidator = require("../Validators/CreateSiteValidators/CreateSiteValidator");

const {
  FetchSiteGetController,
  CreateSitePostController,
} = require("../Controllers/SiteController");

router.get("/", FetchSiteGetController);

router.post("/create", CreateSiteValidator, CreateSitePostController);

module.exports = router;
