require("dotenv").config();
const express = require("express");
const mongoDb = require("./Db/mongodb");

const signinRouter = require("./routes/signin.routes");
const loginRouter = require("./routes/login.routes");
const messageRoute = require("./routes/message.routes");
const cookieparser = require("cookie-parser");
const getAllUsers = require("./routes/getUsers.routes");
const logoutRouter = require("./routes/logout.routes")
const {httpServer,app}=require('./Socket/Socket')
const cors = require("cors");

const port = process.env.PORT || 5000;


app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieparser());
app.use(signinRouter);
app.use(loginRouter);
app.use(messageRoute);
app.use(getAllUsers);
app.use(logoutRouter)
httpServer.listen(port, () => {
  mongoDb();
  console.log("Server is running on port 5000");
});
