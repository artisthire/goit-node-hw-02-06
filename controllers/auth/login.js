const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const { HttpError } = require("../../utils");

/**
 * Authenticate user
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{token: String, user: {email: String, subscription: String}}} user data with token
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw new HttpError(401, "Email not confirmed");
  }

  const token = await jwt.sign({ _id: user._id }, process.env.PRIVATE_KEY, {
    expiresIn: "1d",
  });

  user.token = token;
  await user.save();

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
