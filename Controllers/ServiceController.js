const Service = require("../Models/Service");

exports.ServiceCreatePostController = async (req, res, next) => {
  let { name, image, description } = req.body;

  try {
    let service = new Service({
      name,
      image,
      description,
    });

    let createdService = await service.save();

    res.status(201).json(createdService);
  } catch (err) {
    console.log(err);
  }
};
