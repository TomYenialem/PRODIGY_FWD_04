require("dotenv").config();
const express = require("express");
const mongoDb = require("./Db/mongodb");

const signinRouter = require("./routes/signin.routes");
const loginRouter = require("./routes/login.routes");
const messageRoute = require("./routes/message.routes");
const cookieparser = require("cookie-parser");
const getAllUsers = require("./routes/getUsers.routes");
const logoutRouter = require("./routes/logout.routes");
const { httpServer, app } = require("./Socket/Socket");
const cors = require("cors");
const path = require("path");

const port = process.env.PORT || 5000;

// CORS Configuration
app.use(
  cors({
    origin: [
      "https://prodigy-fwd-04-1.onrender.com",
      "https://prodigy-fwd-04.onrender.com",
    ],
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieparser());

// API Routes
app.use(signinRouter);
app.use(loginRouter);
app.use(messageRoute);
app.use(getAllUsers);
app.use(logoutRouter);

// Serve React Frontend
app.use(express.static(path.join(__dirname, "../frontend/build"))); // Adjust path if needed

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// Start Server
httpServer.listen(port, () => {
  mongoDb();
  console.log(`Server is running on port ${port}`);
});
