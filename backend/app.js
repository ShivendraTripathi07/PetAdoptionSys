const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

const userRoutes = require("./routes/userRoutes");
const petRoutes = require("./routes/petRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://petadoptionsys-1.onrender.com",
    credentials: true,
  })
);

app.use("/user", userRoutes);
app.use("/pets", petRoutes);

module.exports = app;
