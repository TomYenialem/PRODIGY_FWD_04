const mongoose = require("mongoose");
const messageschema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId, //When you use ObjectId, Mongoose understands that it should expect a reference to another document. It can then automatically populate the referenced document when you use Mongoose’s .populate() method.
    ref: "User",
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const messageTable = mongoose.model("message", messageschema);

module.exports = messageTable;
