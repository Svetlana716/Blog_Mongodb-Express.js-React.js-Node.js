import { Router } from "express";
import { celebrate } from "celebrate";
import { upload } from "../services/file";
import auth from "../middlewares/auth";
import { getByIdSchema } from "../validations/common";
import UsersController from "../controllers/users";
import { updateUserSchema } from "../validations/users";

const usersRouter = Router();

usersRouter.get("/me", auth, UsersController.getMe);

usersRouter.patch(
  "/me",
  auth,
  upload.single("avatar"),
  celebrate(updateUserSchema),
  UsersController.update
);

usersRouter.get("/:id", celebrate(getByIdSchema), UsersController.getOne);

export default usersRouter;
