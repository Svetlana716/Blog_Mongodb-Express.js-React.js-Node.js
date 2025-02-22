import ErrorMessage from "../components/ErrorMessage";
import { useForm } from "../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchCreatePost } from "../store/posts/actions";
import { getPostInfoPath } from "../store/posts/selectors";
import { IPostFormInput } from "../utils/types";

const AddPostPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(getPostInfoPath);

  const { values, handleChange, reset } = useForm<IPostFormInput>({
    title: "",
    text: "",
    picture: "",
  });

  const { text, title, picture } = values;

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();

    // Добавляем все значения из values в FormData
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        // Только если значение существует
        data.append(key, value);
      }
    });
    dispatch(fetchCreatePost(data));
    if (error === null && !isLoading) {
      reset();
    }
  };
  return (
    <form
      className="md:w-3/4 lg:w-3/5 mx-auto py-10"
      onSubmit={handleCreatePost}
    >
      <label htmlFor="picture">
        <input
          id="picture"
          type="file"
          name={"picture"}
          onChange={handleChange}
          className="mt-2 border-5 border-dotted border-text-hover-dark dark:border-bg-primary-dark  text-text-primary-dark dark:text-text-primary w-full rounded-sm bg-stone-800 dark:bg-amber-200  p-4 text-md outline-none placeholder:text-gray-700 cursor-pointer h-15"
        />
      </label>
      <div className="flex object-cover py-2">
        {picture && (
          <img
            className="m-auto"
            src={URL.createObjectURL(picture as File)}
            alt="image"
          />
        )}
      </div>
      <label className="text-md text-primary" htmlFor="title">
        Post title:
        <input
          id="title"
          type="title"
          name={"title"}
          value={title}
          onChange={handleChange}
          placeholder="title"
          className="input mb-5"
        />
      </label>
      <label className="text-md text-primary" htmlFor="text">
        Post text:
        <textarea
          id="text"
          name={"text"}
          value={text}
          onChange={handleChange}
          placeholder="post text"
          className="input h-50"
        />
      </label>

      {isLoading && <p>"Загрузка..."</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          type="submit"
          className="button bg-secondary text-md text-primary block-hover"
        >
          Добавить
        </button>
        <button
          type="reset"
          onClick={reset}
          className="button text-md text-primary block-hover outline-2"
        >
          Сбросить
        </button>
      </div>
    </form>
  );
};
export default AddPostPage;
