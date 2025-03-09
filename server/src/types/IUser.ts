import { IPost } from "./IPost";

export interface IUser {
  _id: string;
  name: string;
  description: string;
  avatar: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
  posts?: IPost[];
}

export interface IRegisterUser {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IChangeEmail {
  currentEmail: string;
  newEmail: string;
  password: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword1: string;
  newPassword2: string;
}
