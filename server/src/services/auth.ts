import UserModel from "../models/user";
import TokenService from "./token";
import bcrypt from "bcrypt";
import UserDto from "../dtos/user";
import ApiError from "../errors/ApiError";
import { JwtPayload } from "jsonwebtoken";
import { IRegisterUser } from "types/IUser";

class AuthService {
  async register(user: IRegisterUser) {
    const { name, email, password1, password2 } = user;
    const preflight = await UserModel.findOne({ email });
    if (preflight) {
      throw ApiError.BadRequest(`Пользователь ${email} уже существует`);
    }
    if (password1 !== password2) {
      throw ApiError.BadRequest(`Пароли не совпадают`);
    }
    const hash = await bcrypt.hash(password1, 10);
    const newUser = await UserModel.create({ email, password: hash, name });
    const userDto = new UserDto(newUser);
    const tokens = await TokenService.generate({ ...userDto });
    await TokenService.save(userDto.id, tokens.refreshToken);
    return { ...tokens, user: newUser };
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
    return { ...tokens, user: user };
  }
}

export default new AuthService();
