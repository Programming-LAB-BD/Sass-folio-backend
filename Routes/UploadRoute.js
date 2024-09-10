const router = require("express").Router();

// Import Multer Middleware here
const upload = require("../Middlewares/UploadMiddleware");

// Import Controllers here
const { UploadLogoPostController } = require("../Controllers/UploadController");

router.post("/logo", upload.single("logo"), UploadLogoPostController);

module.exports = router;
