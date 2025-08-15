const Pets = require("../../models/petModel");
const User = require("../../models/userModel");

const getMyPets = async (req, res) => {
  try {
    console.log("User ID from token:", req.userId);

    if (!req.userId) {
      return res.status(401).json({
        message: "User not authenticated",
        error: true,
        success: false,
      });
    }

    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }

    const pets = await Pets.find({ owner: req.userId })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    console.log(`Found ${pets.length} pets for user ${user.name}`);

    res.status(200).json({
      data: { user, pets },
      error: false,
      success: true,
      message: "User pets fetched successfully",
    });
  } catch (error) {
    console.error("Error in getMyPets:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid user ID format",
        error: true,
        success: false,
        data: [],
      });
    }

    res.status(500).json({
      message: error.message || "Server error while fetching pets",
      error: true,
      success: false,
      data: [],
    });
  }
};

module.exports = getMyPets;
