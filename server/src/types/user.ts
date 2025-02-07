import { Document, Types } from "mongoose";

export type UserModel = Document<unknown, {}, IUser> &
  IUser & {
    _id: Types.ObjectId;
  } & {
    __v: number;
  };

export interface IUser {
  email: string;
  password: string;
}
