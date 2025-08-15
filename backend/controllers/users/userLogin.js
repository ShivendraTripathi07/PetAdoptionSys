const User = require("../../models/userModel");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
async function userLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }
    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "8h",
      });
      const tokenOption = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };

      // Include user data in response
      res.cookie("token", token, tokenOption).json({
        message: "Login Successfully",
        data: {
          token: token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
        },
        success: true,
        error: false,
      });
    } else {
      throw new Error("Invalid password");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || "Login failed",
      error: true,
      success: false,
    });
  }
}

module.exports = userLogin;
