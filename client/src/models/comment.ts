import { IUser } from "./user";

export interface IComment {
  _id: string;
  text: string;
  author: IUser;
}
