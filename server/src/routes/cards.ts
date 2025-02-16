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
