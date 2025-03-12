const { StatusCodes } = require("http-status-codes");
const messageTable = require("../models/messageModel");
const Conversation = require("../models/convModel");


const messages = async (req, res) => {
  const { message } = req.body;
  const { id: reciver_id } = req.params;
  const sender_id = req.user._id; 
  if (!message) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please enter a message" });
  }

  try {
    let connversion = await Conversation.findOne({
      participants: { $all: [reciver_id, sender_id] },
    }).populate("message");
    if (!connversion) {
      connversion = await Conversation.create({
        participants: [reciver_id, sender_id],
      });
    }

    const newmessage = new messageTable({
      sender: sender_id,
      receiver: reciver_id,
      message: message,
    });
    if (newmessage) {
      connversion.message.push(newmessage._id);
    }
    await newmessage.save();
    await connversion.save();
// await promise.all([newmessage.save(),connversion.save()])
    return res.status(StatusCodes.CREATED).json(newmessage);
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ "internal server error": error });
  }
};
const getMessages = async (req, res) => {
  try {
    const { id: reciver_id } = req.params;
    const sender = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [reciver_id, sender] },
    }).populate("message");
    // console.log(conversation);
    if (!conversation) {
      return res.status(StatusCodes.ACCEPTED).json([]);
    }
    return res.status(StatusCodes.ACCEPTED).json(conversation);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "internal server error" });
  }
};



module.exports = {
    messages,
    getMessages
}
