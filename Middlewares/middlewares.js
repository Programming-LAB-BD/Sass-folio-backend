const morgan = require("morgan");
const express = require("express");
const cors = require("cors");

const middlewares = [
  morgan("tiny"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  cors({
    origin: "http://localhost:5173", // ক্লায়েন্টের origin
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // যদি credentials প্রয়োজন হয়
  }),
];

module.exports = (app) => {
  middlewares.map((middleware) => {
    app.use(middleware);
  });
};
