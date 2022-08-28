const {User} = require('../../models/user');

/**
 * Logout user
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 */
const logout = async (req, res) => {
  const {_id} = req.user;
  await User.findByIdAndUpdate(_id, {token: null});

  res.status(204).send();
};

module.exports = logout;
