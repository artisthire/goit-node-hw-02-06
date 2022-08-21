/**
 * Performs request parameter validation.
 * If validation fails, passes an error with the new status to the general error handler.
 * @param {object} schema - Joi's schema
 * @param {string} [customMessage] - Custome error message
 */
const validateJoiSchema =
  (schema, customMessage = 'fields validation error') =>
  (req, _, next) => {
    const {error} = schema.validate(req.body);

    if (error) {
      error.messageDetails = {message: customMessage, details: error.message};
      error.status = 400;
      next(error);
    }

    next();
  };

module.exports = validateJoiSchema;
