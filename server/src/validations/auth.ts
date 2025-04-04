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

export const changeUserEmail = {
  body: Joi.object()
    .keys({
      currentEmail: Joi.string().email(),
      newEmail: Joi.string().email(),
      password: Joi.string().min(8),
    })
    .unknown(true),
};

export const changeUserPassword = {
  body: Joi.object()
    .keys({
      currentPassword: Joi.string().min(8),
      newPassword1: Joi.string().min(8),
      newPassword2: Joi.string().min(8),
    })
    .unknown(true),
};

export const activationLink = {
  params: Joi.object()
    .keys({
      link: Joi.string().required(),
    })
    .unknown(true),
};

export const resetPassword = {
  body: Joi.object()
    .keys({
      email: Joi.string().email().required(),
    })
    .unknown(true),
};

export const setNewPassword = {
  body: Joi.object()
    .keys({
      code: Joi.string().required(),
      newPassword1: Joi.string().min(8),
      newPassword2: Joi.string().min(8),
    })
    .unknown(true),
};
