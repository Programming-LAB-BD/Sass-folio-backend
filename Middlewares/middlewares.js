const morgan = require("morgan");
const express = require("express");

const middlewares = [
  morgan("tiny"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
];

module.exports = (app) => {
  middlewares.map((middleware) => {
    app.use(middleware);
  });
};
