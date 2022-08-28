const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
      required: true,
    },
  },
  {versionKey: false}
);

const User = mongoose.model('user', userSchema);

const userAdd = Joi.object({
  password: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().allow('starter', 'pro', 'business'),
  token: Joi.string().token(),
});

module.exports = {
  User,
  joiUserSchemas: {userAdd},
};
