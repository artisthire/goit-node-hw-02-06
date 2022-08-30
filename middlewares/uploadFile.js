const multer = require("multer");
const path = require("path");

const tmpDir = path.resolve("./tmp");
const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, tmpDir);
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
  limits: { fileSize: 1048576 },
});

/**
 * Upload files to the temporary directory
 */
const uploadFile = multer({ storage });

module.exports = uploadFile;
