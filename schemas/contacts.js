const Joi = require('joi');

const postScheme = Joi.object({
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

const putScheme = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .min(3)
    .max(30),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /^(\+?[0-9]{2})?([ .-]?)\(?([0-9]{3})?\)?([ .-]?)([0-9]{3})([ .-]?)([0-9]{4})$/
  ),
}).or('name', 'email', 'phone');

module.exports = {postScheme, putScheme};
