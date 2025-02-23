import { Router } from "express";
import { celebrate } from "celebrate";
import AuthController from "../controllers/auth";
import { loginSchema, registerSchema } from "../validations/auth";

const authRouter = Router();

authRouter.post(
  "/register",
  celebrate(registerSchema),
  AuthController.register
);

authRouter.post("/login", celebrate(loginSchema), AuthController.login);

authRouter.post("/logout", AuthController.logout);
authRouter.get("/refresh", AuthController.refresh);

export default authRouter;
