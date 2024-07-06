require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const routes = require("./Routes/routes");
const middlewares = require("./Middlewares/middlewares");
const config = require("config");

const app = express();

// Setup Middlewares here
middlewares(app);

// Setup Routes here
routes(app);

// Setup MongoDB Url Here
const MONGODB_URI = `mongodb+srv://${config.get("db-user-name")}:${config.get(
  "db-password"
)}@cluster0.qyatvaz.mongodb.net/${config.get(
  "db-name"
)}?retryWrites=true&w=majority&appName=${config.get("db-app-name")}`;

// Setup Database and Server Here
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("DataBase Connected.");
    app.listen(config.get("port"), () => {
      console.log(`App is running on PORT: ${config.get("port")}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
