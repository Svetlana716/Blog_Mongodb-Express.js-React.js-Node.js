import { Response, Request, NextFunction } from "express";
import { constants } from "http2";
import ApiError from "../errors/ApiError";
import UsersService from "../services/users";
import { Error as MongooseError } from "mongoose";

class UsersController {
  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req;
      const user = await UsersService.getMe(userId);
      return res.status(constants.HTTP_STATUS_OK).send(user);
    } catch (error) {
      if (error instanceof MongooseError) {
        next(ApiError.BadRequest("Невалидный id пользователя"));
      }
      next(error);
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) {
        next(ApiError.BadRequest("id не передан"));
      }
      const post = await UsersService.getOne(id);
      return res.status(constants.HTTP_STATUS_OK).send(post);
    } catch (error) {
      if (error instanceof MongooseError) {
        next(ApiError.BadRequest("Невалидный id поста"));
      }
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { body, userId, file } = req;
      const updatedPost = await UsersService.update(userId, body, file);
      return res.status(constants.HTTP_STATUS_OK).send(updatedPost);
    } catch (error) {
      if (error instanceof MongooseError) {
        next(ApiError.BadRequest(error.message));
      }
      next(error);
    }
  }
}

export default new UsersController();
