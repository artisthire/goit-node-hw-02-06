/**
 * Return a user data from the database by id
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{email: String, subscription: String}} user data
 */
const get = async (req, res) => {
  const {email, subscription} = req.user;
  res.json({
    email,
    subscription,
  });
};

module.exports = get;
