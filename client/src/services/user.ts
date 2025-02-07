import { AxiosResponse } from "axios";
import api from "../utils/api";
import { IUser } from "../models/user";

export const getUsers = async (): Promise<AxiosResponse<IUser[]>> => {
  return await api.get<IUser[]>("/users");
};
