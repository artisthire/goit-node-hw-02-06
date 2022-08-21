const ObjectId = require('mongoose').Types.ObjectId;
const {HttpError} = require('../utils/utils');

/**
 * Validate id parameter in the request
 * If validation fails, passes an error with the new status to the general error handler.
 * @param {string} [customMessage] - Custome error message
 */
const validateIdParam =
  (paramName, customMessage = 'Invalid parameter "ID"') =>
  (req, _, next) => {
    const isValidId = ObjectId.isValid(req.params[paramName]);

    if (!isValidId) {
      const error = new HttpError(400, customMessage);
      next(error);
    }

    next();
  };

module.exports = validateIdParam;
