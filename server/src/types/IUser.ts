import { IPost } from "./IPost";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  posts?: IPost[]; //about?: string;
  //avatar?: string;
}
