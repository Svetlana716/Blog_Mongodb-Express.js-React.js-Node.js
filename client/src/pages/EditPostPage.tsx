import { useNavigate, useParams } from "react-router";
import { useForm } from "../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchEditPost, fetchGetPostById } from "../store/posts/actions";
import { getPostInfoPath } from "../store/posts/selectors";
import { IPostFormInput } from "../utils/types";
import { useEffect } from "react";
import { staticFilesURL } from "../utils/constants";

const EditPostPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { posts, currentPost, isLoading, error } =
    useAppSelector(getPostInfoPath);

  const post = posts.find((post) => post._id === id) || currentPost;

  useEffect(() => {
    if (!post && id) {
      dispatch(fetchGetPostById(id));
    }
  }, [post, id, dispatch]);

  const { values, handleChange, reset } = useForm<IPostFormInput>({
    title: post!.title,
    text: post!.text,
    picture: "",
  });

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Нет поста</div>
    );
  }

  const { text, title, picture } = values;

  const handleEditPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    // Добавляем все значения из values в FormData
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        // Только если значение существует
        formData.append(key, value);
      }
    });
    dispatch(fetchEditPost({ id, formData }));
    if (!error && !isLoading) {
      navigate("/myPosts");
    }
  };

  return (
    <form className="w-1/2 mx-auto py-10" onSubmit={handleEditPost}>
      <label htmlFor="picture">
        <input
          id="picture"
          type="file"
          name="picture"
          className="mt-2 border-5 border-dotted border-text-hover-dark dark:border-bg-primary-dark  text-text-primary-dark dark:text-text-primary w-full rounded-sm bg-stone-800 dark:bg-amber-200  p-4 text-md outline-none placeholder:text-gray-700 cursor-pointer h-15"
          onChange={handleChange}
        />
      </label>
      <div className="flex object-cover py-2">
        {post && !picture && (
          <img src={`${staticFilesURL}/${post.picture}`} alt="image" />
        )}

        {picture && (
          <img src={URL.createObjectURL(picture as File)} alt="image" />
        )}
      </div>
      <label htmlFor="title">
        Post title:
        <input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="title"
          className="input"
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
          className="input h-50"
        />
      </label>

      {isLoading && <p>"Загрузка..."</p>}
      {error && <p>{error}</p>}

      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          type="submit"
          className="button text-md text-primary bg-secondary block-hover"
        >
          Подтвердить
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
export default EditPostPage;
