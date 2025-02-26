import { FC } from "react";
import { IComment } from "../models/comment";
import Avatar from "./Avatar";

interface Props {
  comment: IComment;
}

const CommentItem: FC<Props> = ({ comment }) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar user={comment.author} />
      <div className="flex text-primary text-sm">{comment.text}</div>
    </div>
  );
};
export default CommentItem;
