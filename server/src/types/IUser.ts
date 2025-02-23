import { IPost } from "./IPost";

export interface IUser {
  _id: string;
  name: string;
  description: string;
  avatar: string;
  email: string;
  password: string;
  posts?: IPost[];
}

export interface IRegisterUser {
  name: string;
  email: string;
  password1: string;
  password2: string;
}
