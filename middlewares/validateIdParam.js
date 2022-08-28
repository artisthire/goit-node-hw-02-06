const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../utils");

/**
 * Validate id parameter in the request
 * If validation fails, passes an error with the new status to the general error handler.
 * @param {string} [customMessage] - Custome error message
 */
const validateIdParam = (idName) => (req, _, next) => {
  const id = req.params[idName];
  const isValidId = isValidObjectId(id);

  if (!isValidId) {
    const error = new HttpError(400, `${id} is not valide paramenter 'id'`);
    next(error);
  }

  next();
};

module.exports = validateIdParam;
