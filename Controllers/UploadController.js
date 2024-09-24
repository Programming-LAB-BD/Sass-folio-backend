const { firebaseConfig } = require("../firebase");
const jwt = require("jsonwebtoken");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const Showcase = require("../Models/Showcase");

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

exports.UploadLogoPostController = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.json({
      message: "Authentication Faild.",
    });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const metadata = {
    contentType: req.file.mimetype,
  };

  const filename =
    req.file.fieldname + "-" + Date.now() + "-" + req.file.originalname;

  try {
    // Creating Storage Reference here
    const storageRef = await ref(storage, `${req.file.fieldname}/${filename}`);

    const prevLogo = await Showcase.findOne({ user: decoded.id });

    // Chack logo is it default or not then delete it from cloud storage.
    if (prevLogo.logo !== "logo/default-logo.png") {
      await deleteObject(ref(storage, prevLogo.logo));
    }

    // Uploading File to Firebase Database here
    const uploadFile = await uploadBytes(storageRef, req.file.buffer, metadata);

    // Update database here
    let updateditem = await Showcase.findOneAndUpdate(
      { user: decoded.id },
      {
        $set: {
          logo: uploadFile.metadata.fullPath,
        },
      },
      { new: true }
    );

    if (updateditem) {
      res.status(200).json({
        message: "Logo Upload Successfully.",
        logo: updateditem.logo,
      });
    } else {
      res.status(500).json({
        message: "Logo Upload Error Occurred.",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.UploadProfilePicturePostController = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.json({
      message: "Authentication Faild.",
    });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const metadata = {
    contentType: req.file.mimetype,
  };

  const filename =
    req.file.fieldname + "-" + Date.now() + "-" + req.file.originalname;

  try {
    // Creating Storage Reference here
    const storageRef = await ref(storage, `${req.file.fieldname}/${filename}`);

    const prevLogo = await Showcase.findOne({ user: decoded.id });

    // Chack logo is it default or not then delete it from cloud storage.
    if (prevLogo.picture !== "picture/default-picture.png") {
      await deleteObject(ref(storage, prevLogo.picture));
    }

    // Uploading File to Firebase Database here
    const uploadFile = await uploadBytes(storageRef, req.file.buffer, metadata);

    // Update database here
    let updateditem = await Showcase.findOneAndUpdate(
      { user: decoded.id },
      {
        $set: {
          picture: uploadFile.metadata.fullPath,
        },
      },
      { new: true }
    );

    if (updateditem) {
      res.status(200).json({
        message: "Picture Upload Successfully.",
        logo: updateditem.logo,
      });
    } else {
      res.status(500).json({
        message: "Picture Upload Error Occurred.",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.UploadServicePostController = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.json({
      message: "Authentication Faild.",
    });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const metadata = {
    contentType: req.file.mimetype,
  };

  const filename =
    req.file.fieldname + "-" + Date.now() + "-" + req.file.originalname;

  try {
    // Creating Storage Reference here
    const storageRef = await ref(storage, `${req.file.fieldname}/${filename}`);

    // Uploading File to Firebase Database here
    const uploadFile = await uploadBytes(storageRef, req.file.buffer, metadata);

    if (uploadFile) {
      res.status(200).json({
        message: "Icon Upload Successfully.",
        icon: uploadFile.metadata.fullPath,
      });
    } else {
      res.status(500).json({
        message: "Icon Upload Error Occurred.",
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.UploadPortfolioPostController = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.json({
      message: "Authentication Faild.",
    });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  const metadata = {
    contentType: req.file.mimetype,
  };

  const filename =
    req.file.fieldname + "-" + Date.now() + "-" + req.file.originalname;

  try {
    // Creating Storage Reference here
    const storageRef = await ref(storage, `${req.file.fieldname}/${filename}`);

    // Uploading File to Firebase Database here
    const uploadFile = await uploadBytes(storageRef, req.file.buffer, metadata);

    if (uploadFile) {
      res.status(200).json({
        message: "Thumbnail Upload Successfully.",
        thumb: uploadFile.metadata.fullPath,
      });
    } else {
      res.status(500).json({
        message: "Thumbnail Upload Error Occurred.",
      });
    }
  } catch (err) {
    next(err);
  }
};
