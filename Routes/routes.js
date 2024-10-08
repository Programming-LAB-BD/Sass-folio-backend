const express = require("express");
const HomeController = require("../Controllers/HomeController");
const SiteRoute = require("./SiteRoute");
const UserRoute = require("./UserRoute");
const ServiceRoute = require("./ServiceRoute");
const PortfolioRoute = require("./PortfolioRoute");
const ApiRoutes = require("../Api/Routes/routes");
const UploadRoute = require("./UploadRoute");

const routes = [
  {
    path: "/",
    handler: (req, res) => {
      res.send("<h1>Welcome to Backend.</h1>");
    },
  },
  {
    path: "/home",
    handler: HomeController,
  },
  {
    path: "/site",
    handler: SiteRoute,
  },
  {
    path: "/user",
    handler: UserRoute,
  },
  {
    path: "/service",
    handler: ServiceRoute,
  },
  {
    path: "/portfolio",
    handler: PortfolioRoute,
  },
  {
    path: "/api",
    handler: ApiRoutes,
  },
  {
    path: "/upload",
    handler: UploadRoute,
  },
];

module.exports = (app) => {
  routes.map((routeItem) => {
    if (routeItem.path === "/") {
      app.get(routeItem.path, routeItem.handler);
    } else {
      app.use(routeItem.path, routeItem.handler);
    }
  });
};
