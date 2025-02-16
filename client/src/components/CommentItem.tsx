import { FC } from "react";
import { IComment } from "../models/comment";

interface Props {
  comment: IComment;
}

const CommentItem: FC<Props> = ({ comment }) => {
  const avatar = comment.text.trim().toUpperCase().split("").slice(0, 2);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-red-100 text-sm">
        {avatar}
      </div>
      <div className="flex text-primary text-sm">{comment.text}</div>
    </div>
  );
};
export default CommentItem;
