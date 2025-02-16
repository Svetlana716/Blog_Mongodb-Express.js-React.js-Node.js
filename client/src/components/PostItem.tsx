import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import { Link } from "react-router";
import FormatDate from "../utils/FormatDate";
import { IPost } from "../models/post";
import { FC } from "react";
import { staticFilesURL } from "../utils/constants";

interface Props {
  post: IPost;
}

const PostItem: FC<Props> = ({ post }) => {
  if (!post) {
    return <p className="text-xl text-center text-white py-10">Нет постa</p>;
  }

  return (
    <article className="block-hover">
      <Link
        to={`/posts/${post._id}`}
        className="flex flex-col basis-1/4 flex-grow bg-secondary rounded-sm p-5 text-primary text-md"
      >
        <div
          className={post.picture ? "flex rouded-sm h-80" : "flex rounded-sm"}
        >
          {post.picture && (
            <img
              src={`${staticFilesURL}/${post.picture}`}
              alt="img"
              className="object-cover w-full"
            />
          )}
        </div>
        <div className="flex justify-between items-center pt-2">
          <p className="opacity-50">{post.title}</p>
          <p className=" opacity-50">
            {FormatDate.dayMonthYear(post.createdAt)}
          </p>
        </div>
        <p className=" text-xl">{post.title}</p>
        <p className="opacity-60 text-xs pt-4 line-clamp-4">{post.text}</p>

        <div className="flex gap-3 items-center mt-2">
          <div className="flex items-center justify-center gap-2  opacity-50">
            <AiFillEye /> <span>{post.views}</span>
          </div>
          <div className="flex items-center justify-center gap-2  opacity-50">
            <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
          </div>
        </div>
      </Link>
    </article>
  );
};
export default PostItem;
