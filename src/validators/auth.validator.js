const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const otpSchema = Joi.object({
  userId: Joi.number().required(),
  otp: Joi.string().length(6).required(),
});

module.exports = { registerSchema, loginSchema, otpSchema };