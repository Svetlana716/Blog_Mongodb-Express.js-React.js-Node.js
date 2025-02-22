import { Router } from "express";
import { Joi, celebrate } from "celebrate";
import { upload } from "../services/file";
import auth from "../middlewares/auth";
import UserController from "../controllers/users";

const usersRouter = Router();

usersRouter.get("/", auth, UserController.getAll);

export default usersRouter;

// возвращает пользователя по _id
/*userRouter.get(
  "/:userId",
  celebrate({
    params: Joi.object()
      .keys({
        userId: Joi.string().length(24).hex().required(),
      })
      .unknown(true),
  }),
  getUserById
);

// обновляет профиль
userRouter.patch(
  "/me",
  celebrate({
    body: Joi.object()
      .keys({
        name: Joi.string().min(2).max(30),
        about: Joi.string().min(2).max(200),
      })
      .unknown(true),
  }),
  updateUserProfile
);
 */
