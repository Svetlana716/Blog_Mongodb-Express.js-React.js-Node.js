import { NextFunction, Response, Request } from "express";
import ApiError from "../errors/ApiError";
import { validateAccessToken } from "../services/token";
import { JwtPayload } from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers; // с помощью деструктуризации достаем поле authorization из headers
    const accessToken = authorization?.split(" ")[1]; // authorization состоит из строки Bearer и токена, поэтому разобьем строку на массив по пробелу и возьмем второй элемент

    if (!authorization || !accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = validateAccessToken(accessToken) as JwtPayload;

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    return next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};

export default auth;
