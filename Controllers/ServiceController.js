const Service = require("../Models/Service");
const { validationResult } = require("express-validator");
const validationErrorFormatter = require("../utils/validationErrorFormatter");

exports.ServiceCreatePostController = async (req, res, next) => {
  let { name, image, description } = req.body;
  let errors = validationResult(req).formatWith(validationErrorFormatter);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.mapped(),
    });
  }

  try {
    let service = new Service({
      name,
      image,
      description,
    });

    let createdService = await service.save();

    if (createdService) {
      res.status(201).json(createdService);
    } else {
      res.status(500).json({
        message: "Creating Service Error Occurred.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
