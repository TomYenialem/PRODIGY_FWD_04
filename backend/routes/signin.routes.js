const express = require("express");
const signinRouter = express.Router();
const signinController  = require("../controller/signin.controller");

signinRouter.post("/signin", signinController);
module.exports = signinRouter;
