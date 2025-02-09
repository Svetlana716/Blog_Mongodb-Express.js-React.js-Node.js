import { AxiosResponse } from "axios";
import api from "../utils/api";
import { IAuthResponse, ICredentials, IRegistration } from "../models/auth";

export const registrationUser = async (
  credentials: IRegistration
): Promise<AxiosResponse<IAuthResponse>> => {
  return await api.post<IAuthResponse>("/register", credentials);
};

export const loginUser = async (
  credentials: ICredentials
): Promise<AxiosResponse<IAuthResponse>> => {
  return await api.post<IAuthResponse>("/login", credentials);
};

export const logoutUser = async (): Promise<void> => {
  return await api.post("/logout");
};
