const router = require("express").Router();

// Import Multer Middleware here
const upload = require("../Middlewares/UploadMiddleware");

// Import Controllers here
const {
  UploadLogoPostController,
  UploadProfilePicturePostController,
  UploadServicePostController,
  UploadPortfolioPostController,
} = require("../Controllers/UploadController");

router.post("/logo", upload.single("logo"), UploadLogoPostController);

router.post(
  "/profile",
  upload.single("picture"),
  UploadProfilePicturePostController
);

router.post("/icon", upload.single("service"), UploadServicePostController);

router.post(
  "/thumb",
  upload.single("portfolio"),
  UploadPortfolioPostController
);

module.exports = router;
