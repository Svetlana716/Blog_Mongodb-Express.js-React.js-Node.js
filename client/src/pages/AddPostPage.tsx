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
    if (!error && !isLoading) {
      reset();
    }
  };

  return (
    <form
      className="md:w-3/4 lg:w-3/5 mx-auto py-10"
      onSubmit={handleCreatePost}
    >
      <label
        className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-5 border-dotted cursor-pointer h-10"
        htmlFor="picture"
      >
        <input
          id="picture"
          type="file"
          name={"picture"}
          onChange={handleChange}
        />
      </label>
      <div className="flex object-cover py-2">
        {picture && (
          <img src={URL.createObjectURL(picture as File)} alt="image" />
        )}
      </div>
      <label className="text-xs text-white opacity-70" htmlFor="title">
        Post title:
        <input
          id="title"
          type="title"
          name={"title"}
          value={title}
          onChange={handleChange}
          placeholder="title"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-600"
        />
      </label>
      <label className="text-xs text-white opacity-70" htmlFor="text">
        Post text:
        <textarea
          id="text"
          name={"text"}
          value={text}
          onChange={handleChange}
          placeholder="post text"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border resize-none h-40 py-1 px-2 text-xs outline-none placeholder:text-gray-600"
        />
      </label>

      {isLoading && <p>"Загрузка..."</p>}
      {error && <p>{error}</p>}

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          type="submit"
          className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Add
        </button>
        <button
          type="reset"
          onClick={reset}
          className="flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
        >
          Reset
        </button>
      </div>
    </form>
  );
};
export default AddPostPage;
