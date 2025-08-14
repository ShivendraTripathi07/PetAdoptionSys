const User = require("../../models/userModel");

async function userDetails(req, res) {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User detail",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}
module.exports = userDetails;
