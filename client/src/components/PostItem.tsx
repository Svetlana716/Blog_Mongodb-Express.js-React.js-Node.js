//import { AiFillEye, AiOutlineMessage } from "react-icons/ai";
import { Link } from "react-router";
import FormatDate from "../utils/formatDate";
import { IPost } from "../models/post";
import { FC } from "react";
import { staticFilesURL } from "../utils/constants";

interface Props {
  post: IPost;
}

const PostItem: FC<Props> = ({ post }) => {
  return (
    <Link to={`/${post._id}`}>
      <div className="flex flex-col basis-1/4 flex-grow">
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
          <div className="text-xs text-white opacity-50">{post.title}</div>
          <div className="text-xs text-white opacity-50">
            {FormatDate.dayMonthYear(post.createdAt)}
          </div>
        </div>
        <div className="text-white text-xl">{post.title}</div>
        <p className="text-white opacity-60 text-xs pt-4 line-clamp-4">
          {post.text}
        </p>

        {/* <div className="flex gap-3 items-center mt-2">
          <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
            <AiFillEye /> <span>{post}</span>
          </button>
          <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
            <AiOutlineMessage /> <span>{post.comments?.length || 0} </span>
          </button>
        </div> */}
      </div>
    </Link>
  );
};
export default PostItem;
