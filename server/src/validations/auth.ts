import { Segments } from "celebrate";
import Joi from "joi";

export const registerSchema = {
  [Segments.BODY]: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      /* about: Joi.string().min(2).max(200),
        avatar: Joi.string(), */
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
