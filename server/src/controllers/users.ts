import { NextFunction, Response, Request } from "express";
import { constants } from "http2";
import {
  registrationUser,
  logInUser,
  logOutUser,
  refresh,
  getAllUsers,
} from "../services/user";
import { validationResult } from "express-validator";
import ApiError from "../errors/ApiError";

//signup
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(ApiError.BadRequest("Ошибка валидации", errors.array()));
    }
    const { email, password } = req.body;
    const user = await registrationUser(email, password);
    res.cookie("refreshToken", user.refreshToken, {
      maxAge: 3600000 * 24 * 10, // тк указывается в мс, то умножаем кол мс в часе на кол часов сутках и на кол дней
      httpOnly: true, // для того чтобы не получить доступ к кукам из JS
    });
    return res.status(constants.HTTP_STATUS_CREATED).send({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//signin
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next(ApiError.BadRequest("Ошибка валидации", errors.array()));
    }
    const { email, password } = req.body;
    const user = await logInUser(email, password);
    res.cookie("refreshToken", user.refreshToken, {
      maxAge: 3600000 * 24 * 10, // тк указывается в мс, то умножаем кол мс в часе на кол часов сутках и на кол дней
      httpOnly: true, // для того чтобы не получить доступ к кукам из JS
    });
    return res.status(constants.HTTP_STATUS_OK).send({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

//logout
export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;
    logOutUser(refreshToken);
    res.clearCookie("refreshToken");
    return res.status(constants.HTTP_STATUS_OK).send({
      message: "success",
    });
  } catch (error) {
    next(error);
  }
};

//refresh
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;
    const userData = await refresh(refreshToken);
    res.cookie("refreshToken", userData.refreshToken, {
      maxAge: 3600000 * 24 * 10, // тк указывается в мс, то умножаем кол мс в часе на кол часов сутках и на кол дней
      httpOnly: true, // для того чтобы не получить доступ к кукам из JS
    });
    return res.status(constants.HTTP_STATUS_OK).send({
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getAllUsers();
    return res.status(constants.HTTP_STATUS_OK).send({
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

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
