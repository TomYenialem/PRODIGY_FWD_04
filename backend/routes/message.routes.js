const express = require("express");
const {messages,getMessages} = require("../controller/message.controller");
const auth =require("../middleware/auth");
const messageRoute = express.Router();

messageRoute.post("/sentmesaage/:id", auth, messages);
messageRoute.get("/getmesaage/:id", auth, getMessages);

module.exports = messageRoute;
