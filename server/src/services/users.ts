import UserModel from "../models/user";
import ApiError from "../errors/ApiError";
import { IRegisterUser, IUser } from "types/IUser";

class UsersService {
  async getMe(id: string) {
    const user = await UserModel.findById(id).orFail(
      ApiError.NotFoundError(`Нет пользователя с id: ${id}`)
    );
    return user;
  }

  async getOne(id: string) {
    const user = await UserModel.findById(id).orFail(
      ApiError.NotFoundError(`Нет пользователя с id: ${id}`)
    );
    return user;
  }

  async update(
    userId: string,
    body: Partial<IUser | IRegisterUser>,
    avatar: Express.Multer.File | undefined
  ) {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      avatar ? { ...body, avatar: avatar?.filename } : body,
      {
        new: true,
        runValidators: true,
      }
    ).orFail(ApiError.NotFoundError(`Нет пользователя с id: ${userId}`));
    return user;
  }
}

export default new UsersService();
