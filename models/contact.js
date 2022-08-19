const mongoose = require('mongoose');
const Joi = require('joi');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {versionKey: false}
);

const contactAddJoiSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /^(\+?[0-9]{2})?([ .-]?)\(?([0-9]{3})?\)?([ .-]?)([0-9]{3})([ .-]?)([0-9]{4})$/
  ),
  favorite: Joi.bool(),
});

const updateFavoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

const Contact = mongoose.model('contact', contactSchema);

module.exports = {Contact, contactAddJoiSchema, updateFavoriteJoiSchema};
