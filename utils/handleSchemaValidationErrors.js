const HttpError = require("./httpError");

/**
 * Error catcher for Joi validator
 * @param {object} err - Error
 * @param {object} next - callback function
 */
const handleSchemaValidationErrors = (error, _, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new HttpError(409, error.message));
  } else {
    next(new HttpError(400, error.message));
  }

  next();
};

module.exports = handleSchemaValidationErrors;
