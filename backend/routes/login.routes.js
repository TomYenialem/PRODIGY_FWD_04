const express = require("express");
const loginRoute = express.Router();
const loginController = require("../controller/login.controller");

loginRoute.post("/login", loginController);

module.exports = loginRoute;
