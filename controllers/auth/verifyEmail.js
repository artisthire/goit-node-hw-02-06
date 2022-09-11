const { User } = require("../../models/user");
const { HttpError } = require("../../utils");

/**
 * Verification user email
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{message: String}} success verification of user`s email
 */
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  user.verificationToken = "";
  user.verify = true;
  await user.save();

  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
