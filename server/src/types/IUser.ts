import { IPost } from "./IPost";

export interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  //about?: string;
  //avatar?: string;
  posts?: IPost;
}
