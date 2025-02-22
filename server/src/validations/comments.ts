import { Joi } from "celebrate";

export const createCommentSchema = {
  body: Joi.object()
    .keys({
      text: Joi.string().min(2).max(200),
    })
    .unknown(true),
};
