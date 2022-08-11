const catchDBQueryError = (asyncFunc) => async (req, _, next) => {
  try {
    const dbQueryResult = await asyncFunc(req);
    req.dbQueryResult = dbQueryResult;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = catchDBQueryError;
