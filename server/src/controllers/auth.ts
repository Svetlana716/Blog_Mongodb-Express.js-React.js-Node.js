import { Response, Request, NextFunction } from "express";
import { constants } from "http2";
import ApiError from "../errors/ApiError";
import AuthService from "../services/auth";
import { Error as MongooseError } from "mongoose";

const { CLIENT_URL = "" } = process.env;

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
      if (error instanceof MongooseError) {
        next(ApiError.BadRequest(error.message));
      }
      next(error);
    }
  }

  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await AuthService.activate(activationLink);
      return res.redirect(CLIENT_URL);
    } catch (error) {
      if (error instanceof MongooseError) {
        next(ApiError.BadRequest(error.message));
      }
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.login(req.body);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 3600000 * 24 * 10, // тк указывается в мс, то умножаем кол мс в часе на кол часов сутках и на кол дней
        httpOnly: true, // для того чтобы не получить доступ к кукам из JS
      });
      return res.status(constants.HTTP_STATUS_OK).send(user);
    } catch (error) {
      if (error instanceof MongooseError) {
        console.log(error);
        next(ApiError.BadRequest(error.message));
      }
      next(error);
    }
  }

  async changeEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { body, userId } = req;
      const user = await AuthService.changeEmail(body, userId);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 3600000 * 24 * 10, // тк указывается в мс, то умножаем кол мс в часе на кол часов сутках и на кол дней
        httpOnly: true, // для того чтобы не получить доступ к кукам из JS
      });
      return res.status(constants.HTTP_STATUS_OK).send(user);
    } catch (error) {
      if (error instanceof MongooseError) {
        next(ApiError.BadRequest(error.message));
      }
      next(error);
    }
  }

  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { body, userId } = req;
      const user = await AuthService.changePassword(body, userId);
      console.log(user);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 3600000 * 24 * 10,
        httpOnly: true,
      });
      return res.status(constants.HTTP_STATUS_OK).send(user);
    } catch (error) {
      if (error instanceof MongooseError) {
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
