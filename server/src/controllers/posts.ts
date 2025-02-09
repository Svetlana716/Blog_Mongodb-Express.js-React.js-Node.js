import { Response, Request, NextFunction } from "express";
import { constants } from "http2";
import ApiError from "../errors/ApiError";
import PostService from "../services/posts";

class PostController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { body, userId, file } = req;
    try {
      const post = await PostService.create(body, userId, file);
      return res.status(constants.HTTP_STATUS_CREATED).send({ data: post });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await PostService.getAll();
      return res.status(constants.HTTP_STATUS_OK).send(posts);
    } catch (error) {
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        next(ApiError.BadRequest("id не передан"));
      }
      const post = await PostService.getOne(id);
      return res.status(constants.HTTP_STATUS_OK).send({
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { post } = req.body;
      if (!post.id) {
        next(ApiError.BadRequest("id не передан"));
      }
      const updatedPost = await PostService.update(post);
      return res.status(constants.HTTP_STATUS_OK).send({
        data: updatedPost,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        next(ApiError.BadRequest("id не передан"));
      }
      const post = await PostService.getOne(id);

      /* if (post.author.id !== id) {
        next(ApiError.ForbiddenError());
      } */
      post.deleteOne();
      return res.status(constants.HTTP_STATUS_OK).send({
        data: post,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new PostController();

/*

export const likeCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cardId } = req.params;
    const { _id } = req.user;
    const like = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: _id } },
      { new: true }
    ).orFail(ApiError.NotFoundError("Передан несуществующий _id карточки"));
    return res.status(constants.HTTP_STATUS_OK).send({ data: like });
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      return next(ApiError.BadRequest("Переданы некорректные данные"));
    }
    return next(error);
  }
};

export const dislikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cardId } = req.params;
    const { _id } = req.user;
    const dislike = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: _id } },
      { new: true }
    ).orFail(ApiError.NotFoundError("Передан несуществующий _id карточки"));
    return res.status(constants.HTTP_STATUS_OK).send({ data: dislike });
  } catch (error) {
    if (error instanceof MongooseError.CastError) {
      return next(ApiError.BadRequest("Переданы некорректные данные"));
    }
    return next(error);
  }
}; */
