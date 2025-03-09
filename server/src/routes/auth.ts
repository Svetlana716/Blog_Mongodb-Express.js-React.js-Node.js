import { Router } from "express";
import { celebrate } from "celebrate";
import AuthController from "../controllers/auth";
import auth from "../middlewares/auth";
import {
  activationLink,
  changeUserEmail,
  changeUserPassword,
  loginSchema,
  registerSchema,
} from "../validations/auth";

const authRouter = Router();

authRouter.post(
  "/register",
  celebrate(registerSchema),
  AuthController.register
);

authRouter.post("/login", celebrate(loginSchema), AuthController.login);

authRouter.patch(
  "/email",
  auth,
  celebrate(changeUserEmail),
  AuthController.changeEmail
);

authRouter.patch(
  "/password",
  auth,
  celebrate(changeUserPassword),
  AuthController.changePassword
);

authRouter.get(
  "/activate/:link",
  celebrate(activationLink),
  AuthController.activate
);

authRouter.post("/logout", AuthController.logout);
authRouter.get("/refresh", AuthController.refresh);

export default authRouter;
