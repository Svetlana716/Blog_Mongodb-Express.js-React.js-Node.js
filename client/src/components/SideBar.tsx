import { FC } from "react";
import { Link } from "react-router";
import { IPost } from "../models/post";

interface Props {
  post: IPost;
}

export const SideBar: FC<Props> = ({ post }) => {
  return (
    <div className="bg-gray-600 my-1">
      <Link
        to={`${post._id}`}
        className="flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
      >
        {post.title}
      </Link>
    </div>
  );
};
