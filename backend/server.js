const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const petRoutes = require("./routes/petRoutes");
const connectDB = require("./db/db");
const app = express();
app.use(cors());
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/pets", petRoutes);

connectDB().then(() => {
  app.listen(8000, () => {
    console.log("Connected to the database successfully");
    console.log("Hello from the server");
  });
});
