const Pets = require("./../../models/petModel");
const mongoose = require("mongoose");

exports.updatePet = async (req, res) => {
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
        .json({ message: "Not authorized to update this pet" });
    }

    const updates = req.body;
    const updatedPet = await Pets.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    })
      .populate("owner", "name email")
      .lean({ virtuals: true });

    res.json(updatedPet);
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};
