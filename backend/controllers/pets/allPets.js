const Pets = require("./../../models/petModel");

exports.getAllPets = async (req, res) => {
  try {
    let {
      page = 1,
      limit = 8,
      species,
      vaccinated,
      q,
      sort = "createdAt",
      order = "desc",
    } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const filter = {};
    if (species) filter.species = species;
    if (vaccinated != null) filter.vaccinated = vaccinated === "true";
    if (q) filter.name = { $regex: q, $options: "i" };

    const sortOption = {};
    sortOption[sort] = order === "asc" ? 1 : -1;

    const totalItems = await Pets.countDocuments(filter);
    const pets = await Pets.find(filter)
      .populate("owner", "name email")
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean({ virtuals: true });

    res.json({
      items: pets,
      page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems,
    });
  } catch (err) {
    res.status(500).json({ message: err.message || err });
  }
};
