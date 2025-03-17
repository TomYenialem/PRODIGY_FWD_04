const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  profilepic: {
    type: String,
    default: "",
  },
  lastseen: {
    type: Date,
    default: Date.now,
  },
  isOnline: { type: Boolean, default: false },
});
const User = mongoose.model("User", userschema);

module.exports = User;
