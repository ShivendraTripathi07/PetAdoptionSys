const Pets = require("./../../models/petModel");
const mongoose = require("mongoose");

exports.getPetById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid pet ID" });
    }

    const pet = await Pets.findById(id)
      .populate("owner", "name email")
      .lean({ virtuals: true });

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};
