const router = require("express").Router();

const SiteValidator = require("../Validators/CreateSiteValidators/CreateSiteValidator");

const {
  GetSitePostController,
  FetchSitePostController,
  CreateSitePostController,
  UpdateSitePostController,
} = require("../Controllers/SiteController");

router.post("/get", GetSitePostController);

router.post("/", FetchSitePostController);

router.post("/create", SiteValidator, CreateSitePostController);

router.post("/update", SiteValidator, UpdateSitePostController);

module.exports = router;
