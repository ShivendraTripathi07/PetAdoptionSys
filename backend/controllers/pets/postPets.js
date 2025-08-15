const Pets = require("./../../models/petModel");

exports.postPet = async (req, res) => {
  try {
    const { name, species, vaccinated, baseFee, discountPercent, images } =
      req.body;

    if (!name || !species || baseFee == null) {
      return res
        .status(400)
        .json({ message: "Name, species, and baseFee are required" });
    }

    const newPet = await Pets.create({
      name,
      species,
      vaccinated: vaccinated || false,
      baseFee: Number(baseFee),
      discountPercent: Number(discountPercent) || 0,
      images: images || [], // Handle images array
      owner: req.userId, // from authToken middleware
    });

    // Populate owner info in response
    const populatedPet = await Pets.findById(newPet._id)
      .populate("owner", "name email")
      .lean({ virtuals: true });

    res.status(201).json(populatedPet);
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};
