import Joi from "joi";

export const updateUserSchema = {
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      description: Joi.string().min(2).max(200),
      avatar: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(8),
    })
    .unknown(true),
};
