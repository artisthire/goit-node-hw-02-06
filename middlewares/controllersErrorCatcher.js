/**
 * Traps errors of asynchronous operations in controllers.
 * If validation fails, passes an error to the general error handler.
 * @param {function} controller - route's controller
 */
const catchError = (controller) => async (req, res, next) => {
  try {
    await controller(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = catchError;
