import { Joi } from "celebrate";
import { paramId } from "./common";

export const createCommentSchema = {
  params: paramId,
  body: Joi.object()
    .keys({
      text: Joi.string().min(2).max(200),
    })
    .unknown(true),
};
