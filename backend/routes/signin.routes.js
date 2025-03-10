const express = require("express");
const signinRouter = express.Router();
const signinController  = require("../controller/signin");

signinRouter.post("/signin", signinController);
module.exports = signinRouter;
