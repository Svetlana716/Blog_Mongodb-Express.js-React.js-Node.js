import Joi from "joi";

export const registerSchema = {
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password1: Joi.string().min(8).required(),
      password2: Joi.string().min(8).required(),
    })
    .unknown(true),
};

export const loginSchema = {
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    })
    .unknown(true),
};
