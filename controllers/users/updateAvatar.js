const jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;

const { User } = require("../../models/user");

const uploadDir = path.resolve("./public/avatars");

/**
 * Update user's avatar
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{avatarURL: String}} user's avatar url
 */
const updateAvatar = async (req, res) => {
  const { _id: userId } = req.user;
  const { originalname, path: tmpFilePath } = req.file;
  const newFileName = `${userId}_${originalname}`;
  const avatarURL = path.join("avatars", newFileName);

  try {
    const jimpFile = await jimp.read(tmpFilePath);
    await jimpFile.resize(250, 250).writeAsync(tmpFilePath);

    await fs.rename(tmpFilePath, path.join(uploadDir, newFileName));
    await User.findByIdAndUpdate(userId, { avatarURL });

    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(tmpFilePath);

    if (error.message.includes("Unsupported MIME type")) {
      error.status = 400;
    }

    throw error;
  }
};

module.exports = updateAvatar;
