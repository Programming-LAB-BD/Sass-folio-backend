const router = require("express").Router();

const SiteValidator = require("../Validators/CreateSiteValidators/CreateSiteValidator");

const {
  FetchSitePostController,
  CreateSitePostController,
  UpdateSitePostController,
} = require("../Controllers/SiteController");

router.post("/", FetchSitePostController);

router.post("/create", SiteValidator, CreateSitePostController);

router.post("/update", SiteValidator, UpdateSitePostController);

module.exports = router;
