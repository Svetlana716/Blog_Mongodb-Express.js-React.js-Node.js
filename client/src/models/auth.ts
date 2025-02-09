import { IUser } from "./user";

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IRegistration extends ICredentials {
  name: string;
}
