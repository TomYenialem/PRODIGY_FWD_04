const express = require("express");
const messages = require("../controller/message");
const auth =require("../middleware/auth");
const messageRoute = express.Router();

messageRoute.post("/sentmesaage/:id", auth, messages);

module.exports = messageRoute;
