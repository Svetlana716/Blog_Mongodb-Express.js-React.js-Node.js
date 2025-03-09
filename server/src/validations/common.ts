import { Joi } from "celebrate";

export const paramId = Joi.object()
  .keys({
    id: Joi.string().hex().required(),
  })
  .unknown(true);

export const getByIdSchema = {
  params: paramId,
};
