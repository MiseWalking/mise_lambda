const serverless = require("serverless-http");
const express = require("express");
const { connectDB } = require("./db/database.js");
const userController = require("./user/user.controller.js");
const weightController = require("./weight/weight.controller.js");
const routeController = require("./route/route.controller.js");
const dataController = require("./mise/dataController.js");

const app = express();

app.use(express.json());

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.post("/", (req, res, next) => {
  return res.status(200).json(req.body);
});

app.use("/data", dataController);
app.use("/user", userController);
app.use("/weight", weightController);
app.use("/route", routeController);

//404
app.use((req, res, next) => {
  res.sendStatus(404);
});

//500
app.use((err, req, res, next) => {
  res.sendStatus(500);
});

connectDB().then(() => {
  console.log("MongoDB Connected");
});

module.exports.handler = serverless(app);
