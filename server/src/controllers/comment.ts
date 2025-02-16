import { Response, Request, NextFunction } from "express";
import { constants } from "http2";
import ApiError from "../errors/ApiError";
import CommentService from "../services/comment";

class CommentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { body, userId } = req;
      const { id } = req.params;

      const comment = await CommentService.create(userId, id, body);
      return res.status(constants.HTTP_STATUS_CREATED).send(comment);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const comments = await CommentService.getAll(id);
      return res.status(constants.HTTP_STATUS_OK).send(comments);
    } catch (error) {
      next(error);
    }
  }

  /* async getAll(req: Request, res: Response, next: NextFunction) {
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
      return res.status(constants.HTTP_STATUS_OK).send(post);
    } catch (error) {
      next(error);
    }
  }

  async getMy(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req;
      if (!userId) {
        next(ApiError.UnauthorizedError());
      }
      const post = await PostService.getMy(userId);
      return res.status(constants.HTTP_STATUS_OK).send(post);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { body, userId, file } = req;
      const { id } = req.params;
      const updatedPost = await PostService.update(id, userId, body, file);
      return res.status(constants.HTTP_STATUS_OK).send(updatedPost);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req;
      const { id } = req.params;
      await PostService.delete(id, userId);
      return res.status(constants.HTTP_STATUS_OK).send("success");
    } catch (error) {
      next(error);
    }
  } */
}

export default new CommentController();
