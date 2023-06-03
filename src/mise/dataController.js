const express = require("express");
const dataService = require("./dataService.js");

const dataController = express.Router();

dataController.get("/mise", dataService.getMise);
dataController.get("/weather", dataService.getWeather);
dataController.get("/gang", dataService.getGang);

module.exports = dataController;
