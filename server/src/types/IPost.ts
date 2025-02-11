import { IUser } from "./IUser";
import { IComment } from "./IComment";

export interface IPost {
  _id: string;
  title: string;
  text: string;
  author: IUser;
  picture?: Express.Multer.File;
  views: number;
  comments?: IComment[];
}
