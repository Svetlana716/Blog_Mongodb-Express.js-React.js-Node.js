import { Response, Request, NextFunction } from "express";
import { constants } from "http2";
import { validationResult } from "express-validator";
import ApiError from "../errors/ApiError";
import UserService from "../services/users";

class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }
      const user = await UserService.register(req.body);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 3600000 * 24 * 10, // тк указывается в мс, то умножаем кол мс в часе на кол часов сутках и на кол дней
        httpOnly: true, // для того чтобы не получить доступ к кукам из JS
      });
      return res.status(constants.HTTP_STATUS_CREATED).send(user);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }
      const { email, password } = req.body;
      const user = await UserService.login(email, password);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 3600000 * 24 * 10, // тк указывается в мс, то умножаем кол мс в часе на кол часов сутках и на кол дней
        httpOnly: true, // для того чтобы не получить доступ к кукам из JS
      });
      return res.status(constants.HTTP_STATUS_OK).send(user);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      UserService.logout(refreshToken);
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
      const user = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", user.refreshToken, {
        maxAge: 3600000 * 24 * 10, // тк указывается в мс, то умножаем кол мс в часе на кол часов сутках и на кол дней
        httpOnly: true, // для того чтобы не получить доступ к кукам из JS
      });
      return res.status(constants.HTTP_STATUS_OK).send(user);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAll();
      return res.status(constants.HTTP_STATUS_OK).send(users);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();

/*export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id).orFail(
      new NotFoundError("Нет пользователя с таким id")
    );
    return res.status(constants.HTTP_STATUS_OK).send({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).orFail(
      new NotFoundError("Нет пользователя с таким id")
    );
    return res.status(constants.HTTP_STATUS_OK).send({
      data: user,
    });
  } catch (error) {
    next(error);
  }

  export const updateUserProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const changedUser = await User.findByIdAndUpdate(
        {
          _id: req.user._id,
        },
        {
          $set: req.body,
        },
        {
          new: true,
          runValidators: true,
        }
      ).orFail(new NotFoundError("Нет пользователя с таким id"));
      return res.status(constants.HTTP_STATUS_OK).send({
        data: changedUser,
      });
    } catch (error) {
      next(error);
    }
  };
}; */
