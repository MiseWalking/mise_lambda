const express = require("express");
const weightService = require("./weight.service.js");

const weightController = express.Router();

weightController.post("/", weightService.createWeight);
weightController.get("/:userId", weightService.getWeight);
weightController.put("/:weightId", weightService.updateWeight);
weightController.delete("/:weightId", weightService.deleteWeight);

module.exports = weightController;
