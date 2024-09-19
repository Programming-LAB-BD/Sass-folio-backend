const router = require("express").Router();

// Import Multer Middleware here
const upload = require("../Middlewares/UploadMiddleware");

// Import Controllers here
const {
  UploadLogoPostController,
  UploadProfilePicturePostController,
} = require("../Controllers/UploadController");

router.post("/logo", upload.single("logo"), UploadLogoPostController);

router.post(
  "/profile",
  upload.single("picture"),
  UploadProfilePicturePostController
);

module.exports = router;
