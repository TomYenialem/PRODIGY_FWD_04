const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const User =require('../models/userModel')
const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store userId -> socketId mapping
const socketUsers = {};

// Get receiver's socket ID
const receiverSocketId = (receiverId) =>{
  return socketUsers[receiverId]
}

// Handle socket connections
io.on("connection", async(socket) => {
  console.log("User connected:", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId) {
      await User.findByIdAndUpdate(userId, { isOnline: true });
    socketUsers[userId] = socket.id;
    io.emit("onlineuser", Object.keys(socketUsers)); // Broadcast online users
  }

 

  // Handle user disconnection
  socket.on("disconnect", async() => {
    console.log("User disconnected:", socket.id);
    if (userId) {
      delete socketUsers[userId];
      io.emit("onlineuser", Object.keys(socketUsers));
     await User.findByIdAndUpdate(userId, {
       lastSeen: new Date(),
       isOnline: false,
     });
    }
  });
});

module.exports = { httpServer, app, io, receiverSocketId };
