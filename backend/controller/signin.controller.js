const { StatusCodes } = require("http-status-codes");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const signinController = async (req, res) => {
  try {
    const { email, password, confirmPass, username } = req.body;

    // Check for missing fields
    if (!email || !password || !confirmPass || !username) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "All fields must be provided",
      });
    }

    // Check if passwords match
    if (password !== confirmPass) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Please confirm your password",
      });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "User with this email already exists",
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        msg: "Username already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a default profile picture
    const profilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilepic: profilePic,
    });

    await newUser.save();

    return res.status(StatusCodes.CREATED).json({
      user: newUser,
      msg: "User created successfully",
    });
  } catch (error) {
    console.error("Error in signup:", error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      msg: "Internal server error, please try again later",
    });
  }
};

module.exports = signinController;
