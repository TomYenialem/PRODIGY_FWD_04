const { StatusCodes } = require("http-status-codes");

const logout = (req, res) => {
  try {
    res.clearCookie("jwt_token", { path: "/" });
    res.status(StatusCodes.ACCEPTED).json({ msg: "Successfully logged out" });
  } catch (error) {
    console.error("Logout Error:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Internal server error" });
  }
};

module.exports = logout;
