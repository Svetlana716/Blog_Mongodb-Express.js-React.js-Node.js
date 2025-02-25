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

export interface IRegistration {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

export interface IEmailChange {
  currentEmail: string;
  newEmail: string;
  password: string;
}

export interface IPasswordChange {
  currentPassword: string;
  newPassword1: string;
  newPassword2: string;
}
