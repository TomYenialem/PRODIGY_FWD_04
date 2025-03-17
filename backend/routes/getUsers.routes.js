const express = require("express");
const userRoute = express.Router();
const getUser = require("../controller/getUsers.controller");
const auth=require("../middleware/auth");
const getToken = require("../controller/Gettoken.controller");
const lastSeens=require('../controller/lastSeenUser.controller')

userRoute.get("/getusers",auth, getUser);
userRoute.get('/gettoken',auth,getToken)
userRoute.get("/lastseen/:id", lastSeens);

module.exports = userRoute;
