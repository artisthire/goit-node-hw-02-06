const jwt = require('jsonwebtoken');
const {User} = require('../models/user');
const {HttpError} = require('../utils');

/**
 * Authenticate the user by JWT token in the authorization header
 * If authentication succeeded add user data to Request.user
 * Else throw authentication error
 * @param {object} req - Request's object
 * @param {object} next - callback function
 */
const authenticateUser = async (req, _, next) => {
  const authorization = req.get('Authorization') || '';
  const [tokenType, token] = authorization.split(' ');

  try {
    if (!tokenType || tokenType !== 'Bearer' || !token) {
      throw new HttpError(401, 'Not authorized');
    }

    const {_id} = await jwt.verify(token, process.env.PRIVATE_KEY);
    const user = await User.findById({_id});

    if (!user || !user.token || user.token !== token) {
      throw new HttpError(401, 'Not authorized');
    }

    req.user = user;
    next();
  } catch (error) {
    if (['TokenExpiredError', 'JsonWebTokenError'].includes(error.name)) {
      error.status = 401;
    }

    next(error);
  }
};

module.exports = authenticateUser;
