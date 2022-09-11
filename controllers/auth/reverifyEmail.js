const { User } = require("../../models/user");
const { HttpError, sendMail } = require("../../utils");

/**
 * Reverification user email
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{message: String}} success verification of user`s email
 */
const reverifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(404, "Email not found");
  }

  if (user.verify) {
    throw new HttpError(400, "Verification has already been passed");
  }

  const { SERVER_PORT } = process.env;
  const message = `Please follow <a href="http://localhost:${SERVER_PORT}/api/users/verify/${user.verificationToken}">the link</a> to confirm your email`;

  await sendMail(email, message);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = reverifyEmail;
