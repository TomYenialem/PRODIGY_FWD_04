const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log(token);
    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Token not found" });
    }

    // Verify token
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ msg: "Token invalid" });
      }

      const userId = decoded.id;
      console.log(userId);

      const user = await User.findById(userId);

      if (!user) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .json({ msg: "User not found" });
      }

      // Attach the user to the request object
      req.user = user;

      // Proceed to the next middleware
      next();
    });
  } catch (error) {
    console.error(error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

module.exports = auth;
