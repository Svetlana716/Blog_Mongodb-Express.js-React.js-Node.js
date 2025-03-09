import { Router } from "express";
import { Joi, celebrate } from "celebrate";
import { upload } from "../services/file";
import auth from "../middlewares/auth";
import CommentController from "../controllers/comment";
import { createCommentSchema } from "../validations/comments";
import { getByIdSchema } from "../validations/common";

const commentsRouter = Router();

commentsRouter.post(
  "/:id",
  auth,
  celebrate(createCommentSchema),
  CommentController.create
);

commentsRouter.get("/:id", celebrate(getByIdSchema), CommentController.getAll);

export default commentsRouter;
