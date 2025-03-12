require("dotenv").config();
const express = require("express");
const mongoDb = require("./Db/mongodb");
const app = express();
const signinRouter = require("./routes/signin.routes");
const loginRouter = require("./routes/login.routes");
const messageRoute = require("./routes/message.routes");
const cookieparser = require("cookie-parser");
const getAllUsers = require("./routes/getUsers.routes");
const logoutRouter = require("./routes/logout.routes")
const cors = require("cors");

const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
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

app.listen(port, () => {
  mongoDb();
  console.log("Server is running on port 5000");
});
