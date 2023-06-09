const express = require("express");
const userService = require("./user.service.js");
const { body } = require("express-validator");
const { validate } = require("../middleware/validate.js");

const userController = express.Router();

const validateSignup = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
  validate,
];

const validateLogin = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
  validate,
];

userController.post("/signup", validateSignup, userService.signup);
userController.post("/login", validateLogin, userService.login);
userController.post("/", userService.createUserInfo);
userController.get("/:username", userService.getUserInfo);
userController.put("/:username", userService.updateUserInfo);

module.exports = userController;
