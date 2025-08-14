const Pets = require("./../../models/petModel");
const mongoose = require("mongoose");

exports.deletePet = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid pet ID" });
    }

    const pet = await Pets.findById(id);
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    if (pet.owner.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this pet" });
    }

    await pet.deleteOne();
    res.json({ message: "Pet deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};
