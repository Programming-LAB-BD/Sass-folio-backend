const route = require("express").Route();
const HomeController = require("../Controllers/HomeController");
const SiteRoute = require("./SiteRoute");
const UserRoute = require("./UserRoute");
const ServiceRoute = require("./ServiceRoute");

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
