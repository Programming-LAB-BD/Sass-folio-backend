module.exports = (req, res, next) => {
  res.status(201).send({
    message: "Hello world!",
  });
};
