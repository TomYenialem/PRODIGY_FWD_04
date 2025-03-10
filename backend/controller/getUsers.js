const User = require("../models/userModel");

const getUsers = async (req, res) => {
  try {
    const auth_user = req.user._id;
    // const users = await User.find({ _id: { $ne: auth_user } }); // Exclude the authenticated user
    const users = await User.find();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Server Error");
  }
};

module.exports = getUsers;
