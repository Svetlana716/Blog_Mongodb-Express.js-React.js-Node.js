import { Joi } from "celebrate";
import { paramId } from "./common";

const postBody = Joi.object()
  .keys({
    title: Joi.string().min(2).max(30),
    text: Joi.string().min(2).max(200),
    picture: Joi.string(),
  })
  .unknown(true);

export const createPostSchema = {
  body: postBody,
};

export const updatePostSchema = {
  params: paramId,
  body: postBody,
};
