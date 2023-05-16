const express = require("express");
const userService = require("./user.service.js");
// const { body } = require("express-validator");
// const { validate } = require("../middleware/validate.js");

const userController = express.Router();

// const validateSignup = [
//   body("username").trim().notEmpty().withMessage("Username is required"),
//   body("password").trim().notEmpty().withMessage("Password is required"),
//   validate,
// ];

// const validateLogin = [
//   body("username").trim().notEmpty().withMessage("Username is required"),
//   body("password").trim().notEmpty().withMessage("Password is required"),
//   validate,
// ];

userController.post("/signup", userService.signup);
userController.post("/login", userService.login);

module.exports = userController;
