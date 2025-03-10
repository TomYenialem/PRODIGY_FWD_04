const mongoose = require("mongoose");

const conversationSchmema = new mongoose.Schema({
  message: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
      default: [],
    },
  ],
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Conversation = mongoose.model("Conversation", conversationSchmema);

module.exports = Conversation;
