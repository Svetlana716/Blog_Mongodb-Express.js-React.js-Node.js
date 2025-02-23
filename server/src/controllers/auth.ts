import { Response, Request, NextFunction } from "express";
import { constants } from "http2";
import ApiError from "../errors/ApiError";
import AuthService from "../services/auth";
import { Error } from "mongoose";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.register(req.body);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 3600000 * 24 * 10, // тк указывается в мс, то умножаем кол мс в часе на кол часов сутках и на кол дней
        httpOnly: true, // для того чтобы не получить доступ к кукам из JS
      });
      return res.status(constants.HTTP_STATUS_CREATED).send(user);
    } catch (error) {
      if (error instanceof Error) {
        next(ApiError.BadRequest(error.message));
      }
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 3600000 * 24 * 10, // тк указывается в мс, то умножаем кол мс в часе на кол часов сутках и на кол дней
        httpOnly: true, // для того чтобы не получить доступ к кукам из JS
      });
      return res.status(constants.HTTP_STATUS_OK).send(user);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        next(ApiError.BadRequest(error.message));
      }
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      AuthService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.status(constants.HTTP_STATUS_OK).send({
        message: "success",
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const user = await AuthService.refresh(refreshToken);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 3600000 * 24 * 10, // тк указывается в мс, то умножаем кол мс в часе на кол часов сутках и на кол дней
        httpOnly: true, // для того чтобы не получить доступ к кукам из JS
      });
      return res.status(constants.HTTP_STATUS_OK).send(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
