const app = require("./app");
const connectDB = require("./db/db");

if (process.env.NODE_ENV !== "test") {
  connectDB().then(() => {
    app.listen(8000, () => {
      console.log("Connected to the database successfully");
      console.log("Hello from the server on port 8000");
    });
  });
}
