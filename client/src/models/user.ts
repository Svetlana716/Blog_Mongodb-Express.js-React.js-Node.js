export interface IUser {
  _id: string;
  name: string;
  description: string;
  avatar: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
  createdAt: string;
  updatedAt: string;
}
