const mongoose = require("mongoose");
const Joi = require("joi");
const { handleSchemaValidationErrors } = require("../utils");

const subscriptionTypes = ["starter", "pro", "business"];

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: {
        values: subscriptionTypes,
        message: `Value must be one of [${subscriptionTypes}]`,
      },
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false }
);

userSchema.post("save", handleSchemaValidationErrors);
const User = mongoose.model("user", userSchema);

const add = Joi.object({
  password: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid(...subscriptionTypes),
});

const updateSubscription = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionTypes)
    .required(),
});

module.exports = {
  User,
  joiUserSchemas: { add, updateSubscription },
};
