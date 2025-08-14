const express = require("express");
const userLogin = require("../controllers/users/userLogin");
const userRegister = require("../controllers/users/userRegister");
const allUsers = require("../controllers/users/allUsers");
const userDetails = require("../controllers/users/userDetail");
const authToken = require("../middleware/authToken");

const router = express.Router();

router.post("/signup", userRegister);
router.post("/login", userLogin);
router.get("/", authToken, allUsers);
router.get("/userDetail", authToken, userDetails);
module.exports = router;
