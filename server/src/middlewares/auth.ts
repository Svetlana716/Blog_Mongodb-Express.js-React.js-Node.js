import { NextFunction, Response, Request } from "express";
import TokenService from "../services/token";
import ApiError from "../errors/ApiError";
import { JwtPayload, UserJwtPayload } from "jsonwebtoken";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers; // с помощью деструктуризации достаем поле authorization из headers
    const accessToken = authorization?.split(" ")[1]; // authorization состоит из строки Bearer и токена, поэтому разобьем строку на массив по пробелу и возьмем второй элемент

    if (!authorization || !accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = (await TokenService.validateAccess(
      accessToken
    )) as UserJwtPayload;

    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.userId = userData.id;
    return next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
};

export default auth;
