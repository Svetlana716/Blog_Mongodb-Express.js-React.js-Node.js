export interface IPost {
  title: string;
  text: string;
  picture: string;
  author: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPosts {
  posts: IPost[];
  popularPosts: IPost[];
}
