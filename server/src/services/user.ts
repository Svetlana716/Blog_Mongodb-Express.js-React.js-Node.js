import UserModel from "../models/users";
import bcrypt from "bcrypt";
import {
  findToken,
  generateToken,
  removeToken,
  saveToken,
  validateRefreshToken,
} from "./token";
import UserDto from "../dtos/user";
import ApiError from "../errors/ApiError";
import { JwtPayload } from "jsonwebtoken";

export const registrationUser = async (email: string, password: string) => {
  const preflight = await UserModel.findOne({ email });
  if (preflight) {
    throw ApiError.BadRequest(`Пользователь ${email} уже существует`);
  }
  const hash = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ email, password: hash });
  const userDto = new UserDto(user);
  const tokens = await generateToken({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto };
};

export const logInUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw ApiError.BadRequest(`Пользователь c ${email} не существует`);
  }

  const isPassEquals = await bcrypt.compare(password, user.password);
  if (!isPassEquals) {
    throw ApiError.BadRequest(`Неверный пароль`);
  }
  const userDto = new UserDto(user);
  const tokens = await generateToken({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto };
};

export const logOutUser = async (refreshToken: string) => {
  return await removeToken(refreshToken);
};

export const refresh = async (refreshToken: string) => {
  if (!refreshToken) {
    throw ApiError.UnauthorizedError();
  }
  const userData = validateRefreshToken(refreshToken) as JwtPayload;
  const isTokenInDb = await findToken(refreshToken);
  if (!userData || !isTokenInDb) {
    throw ApiError.UnauthorizedError();
  }
  const { email } = userData;
  const user = await UserModel.findOne({ email });
  const userDto = new UserDto(user);
  const tokens = await generateToken({ ...userDto });
  await saveToken(userDto.id, tokens.refreshToken);
  return { ...tokens, user: userDto };
};

export const getAllUsers = async () => {
  const users = await UserModel.find();
  return users;
};
