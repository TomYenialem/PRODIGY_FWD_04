const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store userId -> socketId mapping
const socketUsers = {};

// Get receiver's socket ID
const receiverSocketId = (receiverId) => socketUsers[receiverId];

// Handle socket connections
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId) {
    socketUsers[userId] = socket.id;
    io.emit("onlineuser", Object.keys(socketUsers)); // Broadcast online users
  }

  // Handle sending messages
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const receiverSocket = receiverSocketId(receiverId);
    if (receiverSocket) {
      io.to(receiverSocket).emit("receiveMessage", { senderId, message });
    }
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    if (userId) {
      delete socketUsers[userId];
      io.emit("onlineuser", Object.keys(socketUsers));
    }
  });
});

module.exports = { httpServer, app, io, receiverSocketId };
