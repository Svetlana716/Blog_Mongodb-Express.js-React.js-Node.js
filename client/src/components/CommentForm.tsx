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
import ErrorMessage from "./ErrorMessage";

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
    <aside className="basis-2/5 p-8 bg-secondary flex flex-col gap-2 rounded-sm">
      <form className="flex gap-2 mb-5" onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          name="text"
          onChange={handleChange}
          placeholder="Comment"
          className="input"
        />
        <button
          type="submit"
          className="flex justify-center items-center bg-primary text-md text-primary font-semibold rounded-sm px-2 py-2"
        >
          Отправить
        </button>
      </form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading && <p>"Загрузка..."</p>}

      {comments?.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </aside>
  );
};
export default Comments;
