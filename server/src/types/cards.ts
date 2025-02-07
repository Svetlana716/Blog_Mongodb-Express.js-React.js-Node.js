import { Types } from 'mongoose';

export interface ICard {
  name: string;
  link: string;
  owner: Types.ObjectId;
  likes: Types.ObjectId[],
  createdAt: Date;

}
