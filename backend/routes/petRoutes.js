const express = require("express");
const authToken = require("../middleware/authToken");
const { postPet } = require("../controllers/pets/postPets");
const { getAllPets } = require("../controllers/pets/allPets");
const { getPetById } = require("../controllers/pets/petDetail");
const { updatePet } = require("../controllers/pets/updatePet");
const { deletePet } = require("../controllers/pets/deletePet");
const getMyPets = require("../controllers/pets/getMyPets");

const router = express.Router();

router.post("/", authToken, postPet);
router.get("/", authToken, getAllPets);
router.get("/my", authToken, getMyPets);
router.get("/:id", authToken, getPetById);
router.put("/:id", authToken, updatePet);
router.delete("/:id", authToken, deletePet);

module.exports = router;
