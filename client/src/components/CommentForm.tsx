import { FC, useEffect } from "react";
import { useForm } from "../hooks/useForm";
import {
  fetchCreateComment,
  fetchGetComments,
} from "../store/comments/actions";
import { getCommentsInfoPath } from "../store/comments/selectors";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ICommentFormInput } from "../utils/types";
import CommentItem from "./CommentItem";

interface Props {
  id: string;
}

const Comments: FC<Props> = ({ id }) => {
  const dispatch = useAppDispatch();
  const { comments, isLoading, error } = useAppSelector(getCommentsInfoPath);

  const { values, handleChange, reset } = useForm<ICommentFormInput>({
    text: "",
  });
  const { text } = values;

  useEffect(() => {
    dispatch(fetchGetComments(id));
  }, [dispatch, id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchCreateComment({ id, values }));
    if (!error && !isLoading) {
      reset();
    }
  };

  return (
    <div className=" p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          name="text"
          onChange={handleChange}
          placeholder="Comment"
          className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
        />
        <button
          type="submit"
          className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Отправить
        </button>
      </form>

      {isLoading && <p>"Загрузка..."</p>}
      {error && <p>{error}</p>}

      {comments?.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  );
};
export default Comments;
