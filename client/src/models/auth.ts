import { IUser } from "./user";

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface IAuthError {
  message: string;
  errors: string[];
}

export interface ICredentials {
  email: string;
  password: string;
}
