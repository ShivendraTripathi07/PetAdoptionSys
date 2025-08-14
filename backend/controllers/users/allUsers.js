const User = require("./../../models/userModel");

async function allUsers(req, res) {
  try {
    const allUsers = await User.find();

    res.json({
      message: "All Users",
      data: allUsers,
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      error: true,
      success: false,
    });
  }
}

module.exports = allUsers;
