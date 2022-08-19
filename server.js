const mongoose = require('mongoose');
require('dotenv').config();

const app = require('./app');

(async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Database connection successful');
  } catch {
    console.error('\x1b[31m Database connection error');
    process.exit(1);
  }

  app.listen(3000, () => {
    console.log('Server running. Use our API on port: 3000');
  });
})();
