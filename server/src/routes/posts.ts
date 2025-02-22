import { Router } from "express";
import { Joi, celebrate } from "celebrate";
import { upload } from "../services/file";
import auth from "../middlewares/auth";
import PostController from "../controllers/posts";
import { createPostSchema, updatePostSchema } from "../validations/posts";
import { getByIdSchema } from "../validations/common";

const postsRouter = Router();

postsRouter.post(
  "/",
  auth,
  upload.single("picture"), // в upload.single("название поля формы")
  /* celebrate(createPostSchema), */
  PostController.create
);

postsRouter.get("/", PostController.getAll);

postsRouter.get("/my", auth, PostController.getMy);

postsRouter.put(
  "/:id",
  auth,
  upload.single("picture"),
  celebrate(updatePostSchema),
  PostController.update
);

postsRouter.get("/:id", celebrate(getByIdSchema), PostController.getOne);

postsRouter.delete(
  "/:id",
  auth,
  celebrate(getByIdSchema),
  PostController.delete
);

export default postsRouter;
