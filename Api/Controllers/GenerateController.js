const { getStorage, ref, getDownloadURL } = require("firebase/storage");
const { initializeApp } = require("firebase/app");
const { firebaseConfig } = require("../../firebase");

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

exports.GenerateImageUrlPostController = async (req, res, next) => {
  let { imagePath } = req.body;

  try {
    const storageRef = await ref(storage, imagePath);

    let url = await getDownloadURL(storageRef);

    res.status(200).json({
      url,
    });
  } catch (err) {
    next(err);
  }
};
