import { AxiosResponse } from "axios";
import api from "../utils/api";
import { IUser } from "../models/user";

export const getMe = async (): Promise<AxiosResponse<IUser>> => {
  return await api.get<IUser>("/users/me");
};

export const editMe = async (
  formData: FormData
): Promise<AxiosResponse<IUser>> => {
  return await api.patch<IUser>("/users/me", formData);
};
