const express = require("express");
const userRoute = express.Router();
const getUser = require("../controller/getUsers");
const auth=require("../middleware/auth");

userRoute.post("/getusers",auth, getUser);

module.exports = userRoute;
