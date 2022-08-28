const bcrypt = require('bcryptjs');

const {User} = require('../../models/user');
const {HttpError} = require('../../utils');

/**
 * Register user
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{user: {email: String, subscription: String}}} register data
 */
const singup = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email});

  if (user) {
    throw new HttpError(409, 'Email in use');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({email, password: passwordHash});
  await newUser.save();

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = singup;
