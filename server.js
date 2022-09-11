const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connection successful");
  } catch {
    console.error("\x1b[31m Database connection error");
    process.exit(1);
  }

  const PORT = process.env.SERVER_PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
})();
