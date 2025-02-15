import { FC } from "react";
import { Link } from "react-router";
import { IPost } from "../models/post";
import { AiFillEye, AiOutlineMessage } from "react-icons/ai";

interface Props {
  posts: IPost[];
}

export const SideBar: FC<Props> = ({ posts }) => {
  return (
    <aside className="basis-2/5 bg-gray-800 p-5 box-border">
      <h2 className="text-lg font-semibold text-white">Популярное:</h2>
      <ul className="list-none p-0 m-0">
        {posts.map((post) => (
          <li className="first:border-none border-t-2 border-amber-50 border-solid  mt-5 first:pt-0 pt-5 ">
            <article>
              <Link
                key={post._id}
                to={`/posts/${post._id}`}
                className="flex text-xs p-2 text-gray-300 hover:bg-gray-800 hover:text-white"
              >
                {post.title}
              </Link>
              <div className="flex gap-3 items-center mt-2">
                <div className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                  <AiFillEye /> <span>{post.views}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                  <AiOutlineMessage />
                  <span>{post.comments?.length || 0} </span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </aside>
  );
};
