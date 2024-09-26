const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

const middlewares = [
  morgan("tiny"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  cors({
    origin: "https://saas-folio.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }),
];

module.exports = (app) => {
  middlewares.map((middleware) => {
    app.use(middleware);
  });
};
