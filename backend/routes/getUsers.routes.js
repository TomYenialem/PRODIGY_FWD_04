const express = require("express");
const userRoute = express.Router();
const getUser = require("../controller/getUsers.controller");
const auth=require("../middleware/auth");
const getToken = require("../controller/Gettoken.controller");

userRoute.get("/getusers", getUser);
userRoute.get('/gettoken',auth,getToken)

module.exports = userRoute;
