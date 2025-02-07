import { Response, Request, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import { constants } from 'http2';
import Card from '../models/cards';
import BadRequestError from '../errors/BadRequestError';
import NotFoundError from '../errors/NotFoundError';
import ForbiddenError from '../errors/ForbiddenError';

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await Card.find({});
    return res.status(constants.HTTP_STATUS_OK).send({ data: cards });
  } catch (error) {
    return next(error);
  }
};

export const createCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newCard = await Card.create({
      ...req.body,
      owner: req.user._id,
    });
    return res.status(constants.HTTP_STATUS_CREATED).send({ data: newCard });
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
};

export const deleteCardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const { _id } = req.user;
    const card = await Card.findById(cardId).orFail(new NotFoundError('Нет карточки с таким id'));
    if (card.owner !== _id) {
      throw new ForbiddenError('Нет доступа');
    }
    card.deleteOne();
    return res.status(constants.HTTP_STATUS_OK).send({ data: card });
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      return next(new BadRequestError('Невалидный id карточки'));
    }
    return next(error);
  }
};

export const likeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const { _id } = req.user;
    const like = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: _id } },
      { new: true },
    )
      .orFail(new NotFoundError('Передан несуществующий _id карточки'));
    return res.status(constants.HTTP_STATUS_OK).send({ data: like });
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(error);
  }
};

export const dislikeCard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const { _id } = req.user;
    const dislike = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: _id } },
      { new: true },
    )
      .orFail(new NotFoundError('Передан несуществующий _id карточки'));
    return res.status(constants.HTTP_STATUS_OK).send({ data: dislike });
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      return next(new BadRequestError('Переданы некорректные данные'));
    }
    return next(error);
  }
};
