const Pets = require("./../../models/petModel");

exports.postPet = async (req, res) => {
  try {
    const { name, species, vaccinated, baseFee, discountPercent } = req.body;

    if (!name || !species || baseFee == null) {
      return res
        .status(400)
        .json({ message: "Name, species, and baseFee are required" });
    }

    const newPet = await Pets.create({
      name,
      species,
      vaccinated,
      baseFee,
      discountPercent,
      owner: req.userId, // from authToken middleware
    });

    res.status(201).json(newPet);
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};
