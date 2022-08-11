const Joi = require('joi');

const validateContentFields = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^[a-zA-Z0-9\s]+$/)
      .min(3)
      .max(30)
      .required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .pattern(
        /^(\+?[0-9]{2})?([ .-]?)\(?([0-9]{3})?\)?([ .-]?)([0-9]{3})([ .-]?)([0-9]{4})$/
      )
      .required(),
  });

  const {error} = schema.validate(req.body);

  if (error) {
    res.status(400).json({message: error.details[0].message});
    return;
  }

  next();
};

module.exports = validateContentFields;
