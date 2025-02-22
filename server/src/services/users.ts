import UserModel from "../models/user";
import TokenService from "../services/token";
import bcrypt from "bcrypt";
import UserDto from "../dtos/user";
import ApiError from "../errors/ApiError";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "types/IUser";

class UserService {
  async register({ email, password, name }: IUser) {
    const preflight = await UserModel.findOne({ email });
    if (preflight) {
      throw ApiError.BadRequest(`Пользователь ${email} уже существует`);
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, password: hash, name });
    const userDto = new UserDto(user);
    const tokens = await TokenService.generate({ ...userDto });
    await TokenService.save(userDto.id, tokens.refreshToken);
    return { ...tokens, user };
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`Пользователь c ${email} не существует`);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Неверный пароль`);
    }
    const userDto = new UserDto(user);
    const tokens = await TokenService.generate({ ...userDto });
    await TokenService.save(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken: string) {
    return await TokenService.remove(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = (await TokenService.validateRefresh(
      refreshToken
    )) as JwtPayload;
    const isTokenInDb = await TokenService.find(refreshToken);
    if (!userData || !isTokenInDb) {
      throw ApiError.UnauthorizedError();
    }
    const { email } = userData;
    const user = await UserModel.findOne({ email });
    const userDto = new UserDto(user);
    const tokens = await TokenService.generate({ ...userDto });
    await TokenService.save(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAll() {
    return await UserModel.find();
  }
}

export default new UserService();
