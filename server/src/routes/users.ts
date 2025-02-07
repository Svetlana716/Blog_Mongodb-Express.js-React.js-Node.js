import { Router } from "express";
import { Joi, celebrate } from "celebrate";
import {
  getUsers,
  getUserById,
  updateUserProfile,
  getCurrentUser,
} from "../controllers/users";

const userRouter = Router();

// возвращает информацию о текущем пользователе
userRouter.get("/me", getCurrentUser);

// возвращает всех пользователей
userRouter.get("/", getUsers);

// возвращает пользователя по _id
userRouter.get(
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

// обновляет аватар
userRouter.patch(
  "/me/avatar",
  celebrate({
    body: Joi.object()
      .keys({
        avatar: Joi.string().required(),
      })
      .unknown(true),
  }),
  updateUserProfile
);

export default userRouter;
