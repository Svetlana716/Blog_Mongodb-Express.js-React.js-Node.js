export interface IPost {
  _id: string;
  title: string;
  text: string;
  author: string;
  picture?: string;
  views: number;
  comments?: [];
  createdAt: string;
  updatedAt: string;
}

export interface IPosts {
  posts: IPost[];
  popularPosts: IPost[];
}
