import { IUser } from "./IUser";

export interface IComment {
  _id: string;
  text: string;
  author: IUser;
}
