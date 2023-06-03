const routeService = require("./route.service.js");
const express = require("express");

const routeController = express.Router();

routeController.get("/:imageId", routeService.getRoute);
routeController.post("/", routeService.createRoute);

module.exports = routeController;
