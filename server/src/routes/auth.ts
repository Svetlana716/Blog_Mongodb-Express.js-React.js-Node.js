import { Router } from "express";
import { Joi, celebrate } from "celebrate";
import UserController from "../controllers/users";
import { loginSchema, registerSchema } from "../validations/auth";

const authRouter = Router();

authRouter.post(
  "/register",
  celebrate(registerSchema),
  UserController.register
);

authRouter.post("/login", celebrate(loginSchema), UserController.login);

authRouter.post("/logout", UserController.logout);
authRouter.get("/refresh", UserController.refresh);

export default authRouter;
