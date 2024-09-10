exports.UploadLogoPostController = (req, res, next) => {
  console.log(req.file);
  res.send("file getting successfull.");
};
