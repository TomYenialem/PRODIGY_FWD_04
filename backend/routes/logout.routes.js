const express = require("express");
const loginRoute = express.Router();
const logoutController = require("../controller/logout.controller");

loginRoute.post("/logout", logoutController);

module.exports = loginRoute;
