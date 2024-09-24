const Service = require("../Models/Service");
const Showcase = require("../Models/Showcase");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const validationErrorFormatter = require("../utils/validationErrorFormatter");
const { firebaseConfig } = require("../firebase");
const { initializeApp } = require("firebase/app");
const { getStorage, ref, deleteObject } = require("firebase/storage");

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

exports.ServiceFetchPostController = async (req, res, next) => {
  let { id } = req.body;

  try {
    let service = await Service.findOne({ _id: id });

    if (service) {
      res.status(200).json(service);
    } else {
      res.status(200).json({
        message: "Service not found.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.ServiceCreatePostController = async (req, res, next) => {
  let { name, icon, description, token } = req.body;

  if (!token) {
    return res.json({
      message: "Authentication Faild.",
    });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  let errors = validationResult(req).formatWith(validationErrorFormatter);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.mapped(),
    });
  }

  try {
    let showcase = await Showcase.findOne({ user: decoded.id });

    if (!showcase) {
      return res.status(500).json({
        message: "Site not found",
      });
    }

    let service = new Service({
      name,
      icon,
      description,
      showcase: showcase._id,
      user: decoded.id,
    });

    let createdService = await service.save();

    if (!createdService) {
      return res.status(500).json({
        message: "Creating Service Error Occurred.",
      });
    }

    let updateShowcase = await Showcase.findOneAndUpdate(
      { _id: showcase._id },
      {
        $push: {
          services: createdService._id,
        },
      },
      { new: true }
    );

    if (updateShowcase) {
      res.status(201).json(createdService);
    } else {
      res.status(500).json({
        message: "Service Created. but Updating your Showcase Error Occurred.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.ServiceDeletePostController = async (req, res, next) => {
  let { token, id } = req.body;

  if (!token) {
    return res.json({
      message: "Authentication Faild.",
    });
  }

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  try {
    let showcase = await Showcase.findOne({ user: decoded.id, services: id });

    if (!showcase) {
      return res.status(200).json({
        message: "Showcase not found.",
      });
    }

    let updatedShowcase = await Showcase.findOneAndUpdate(
      { _id: showcase._id },
      {
        $pull: {
          services: id,
        },
      },
      { new: true }
    );

    if (!updatedShowcase) {
      return res.status(200).json({
        message: "Deleteing site error occoured!",
      });
    }

    let currentService = await Service.findOne({ _id: id });

    if (!currentService) {
      return res.status(200).json({
        message: "Service not found.",
      });
    }

    // Delete the icon here
    await deleteObject(ref(storage, currentService.icon));

    let deletedService = await Service.findOneAndDelete({ _id: id });

    if (deletedService) {
      res.status(200).json({
        message: "Service deleting successfull.",
        delete: true,
      });
    } else {
      res.status(200).json({
        message: "Service not found.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
