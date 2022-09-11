const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");
const { HttpError, sendMail } = require("../../utils");

/**
 * Register user
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{user: {email: String, subscription: String}}} register data
 */
const singup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new HttpError(409, "Email in use");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = new User({
    email,
    password: passwordHash,
    avatarURL,
    verificationToken,
  });
  await newUser.save();

  const { SERVER_PORT } = process.env;
  const message = `Please follow <a href="http://localhost:${SERVER_PORT}/api/users/verify/${verificationToken}">the link</a> to confirm your email`;
  await sendMail(email, message);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = singup;
