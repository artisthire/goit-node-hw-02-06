const { User } = require("../../models/user");

/**
 * Update user's subscription in the database by user's id
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{email: String, subscription: String}} user data
 */
const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const user = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { runValidators: true, new: true }
  );

  res.json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = updateSubscription;
