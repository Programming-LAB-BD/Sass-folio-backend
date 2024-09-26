require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const routes = require("./Routes/routes");
const middlewares = require("./Middlewares/middlewares");

// const config = require("config");

const app = express();

// Setup Middlewares here
middlewares(app);

// Setup Routes here
routes(app);

// Setup MongoDB Url Here
const MONGODB_URI = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.qyatvaz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

// Setup Database and Server Here
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("DataBase Connected.");
    app.listen(process.env.PORT, () => {
      console.log(`App is running on PORT: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
