const { StatusCodes } = require("http-status-codes");
const bycrpt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(StatusCodes.BAD_REQUEST).json({ msg: "All fields required" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "user not found" });
    }

    const isMatched = await bycrpt.compare(password, user?.password);
    if (!isMatched) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Invalid password" });
    }
    const payloads = {
      id: user._id,
      email: user.email,
      name: user.username,
    };
    const token = jwt.sign(payloads, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 3600000), // 1 hour
      httpOnly: true,
      secure: true, // set to true for HTTPS
      sameSite: "none",
    });

    res.status(StatusCodes.ACCEPTED).json({
      msg: " succesfully login",
      user: {
        id: user._id,
        email: user.email,
        name: user.username,
        profilepic: user.profilepic,
      },
    });

    // return res.status(StatusCodes.ACCEPTED).json({ msg: "login accepted" });
  } catch (error) {
    console.log(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal Server Error" });
  }
};

module.exports = loginController;
