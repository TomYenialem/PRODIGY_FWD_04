require("dotenv").config();
const express = require("express");
const mongoDb = require("./Db/mongodb");
const app = express();
const signinRouter=require('./routes/signin.routes')
const loginRouter=require('./routes/login.routes')
const messageRoute=require('./routes/message.routes')
const cookieparser=require('cookie-parser')
const getAllUsers=require('./routes/getUsers.routes')

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use(express.json())
app.use(cookieparser())
app.use(signinRouter)
app.use(loginRouter)
app.use(messageRoute)
app.use(getAllUsers)

app.listen(5000, () => {
  mongoDb();
  console.log("Server is running on port 5000");
});
