const mongoose = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../utils");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
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
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

contactSchema.post("save", handleSchemaValidationErrors);

const Contact = mongoose.model("contact", contactSchema);

const contactAdd = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9\s]+$/)
    .min(3)
    .max(30)
    .required(),
  email: Joi.string().email(),
  phone: Joi.string().pattern(
    /^(\+?[0-9]{2})?([ .-]?)\(?([0-9]{3})?\)?([ .-]?)([0-9]{3})([ .-]?)([0-9]{4})$/
  ),
  favorite: Joi.boolean(),
});

const updateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  Contact,
  joiContactSchemas: { contactAdd, updateFavorite },
};
