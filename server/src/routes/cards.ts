import { Router } from "express";
import { Joi, celebrate } from "celebrate";
import {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} from "../controllers/cards";

const cardsRouter = Router();

// возвращает все карточки
cardsRouter.get("/", getCards);

// создаёт карточку
cardsRouter.post(
  "/",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().required().min(2).max(30),
        link: Joi.string().required(),
      })
      .unknown(true),
  }),
  createCard
);

// удаляет карточку по идентификатору
cardsRouter.delete(
  "/:cardId",
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().length(24).hex().required(),
      })
      .unknown(true),
  }),
  deleteCardById
);

// поставить лайк карточке
cardsRouter.put(
  "/:cardId/likes",
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().length(24).hex().required(),
      })
      .unknown(true),
  }),
  likeCard
);

// убрать лайк с карточки
cardsRouter.delete(
  "/:cardId/likes",
  celebrate({
    params: Joi.object()
      .keys({
        cardId: Joi.string().length(24).hex().required(),
      })
      .unknown(true),
  }),
  dislikeCard
);

export default cardsRouter;
