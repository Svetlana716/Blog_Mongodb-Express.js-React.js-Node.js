import { Response, Request, NextFunction } from "express";
import { constants } from "http2";
import ApiError from "../errors/ApiError";
import CommentService from "../services/comment";
import { Error as MongooseError } from "mongoose";

class CommentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body, userId } = req;
      const { id } = req.params;

      const comment = await CommentService.create(userId, id, body);
      return res.status(constants.HTTP_STATUS_CREATED).send(comment);
    } catch (error) {
      if (error instanceof MongooseError) {
        next(ApiError.BadRequest(error.message));
      }
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const comments = await CommentService.getAll(id);
      return res.status(constants.HTTP_STATUS_OK).send(comments);
    } catch (error) {
      if (error instanceof MongooseError) {
        next(ApiError.BadRequest("Невалидный id поста"));
      }
      next(error);
    }
  }
}

export default new CommentController();
