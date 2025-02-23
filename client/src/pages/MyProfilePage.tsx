import { IoArrowBackOutline } from "react-icons/io5";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useForm } from "../hooks/useForm";
import { IProfileFormInput } from "../utils/types";
import { getUserInfoPath } from "../store/users/selectors";
import { useEffect } from "react";
import { fetchEditMe, fetchGetMe } from "../store/users/actions";
import { staticFilesURL } from "../utils/constants";

const MyProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector(getUserInfoPath);

  useEffect(() => {
    if (!user) {
      dispatch(fetchGetMe());
    }
  }, [dispatch, user]);

  const { values, handleChange, setNewValues } = useForm<IProfileFormInput>({
    name: "",
    description: "",
    avatar: "",
  });

  useEffect(() => {
    if (user) {
      setNewValues({
        name: user.name,
        description: user.description,
        avatar: "",
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className="text-xl text-center text-white py-10">
        Такого пользователя не существует
      </div>
    );
  }

  const { name, description, avatar } = values;

  const handleEditProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    // Добавляем все значения из values в FormData
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        // Только если значение существует
        data.append(key, value);
      }
    });
    dispatch(fetchEditMe(data));
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <>
      <IoArrowBackOutline
        className="text-primary text-hover"
        size={25}
        onClick={handleBackClick}
      />
      {isLoading ? (
        <p>"loading"</p>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <div className="flex max-lg:flex-col gap-10 py-8">
          <form
            className="md:w-3/4 lg:w-3/5 mx-auto py-10"
            onSubmit={handleEditProfile}
          >
            <label htmlFor="avatar">
              <input
                id="avatar"
                type="file"
                name="avatar"
                className="mt-2 border-5 border-dotted border-text-hover-dark dark:border-bg-primary-dark  text-text-primary-dark dark:text-text-primary w-full rounded-sm bg-stone-800 dark:bg-amber-200  p-4 text-md outline-none placeholder:text-gray-700 cursor-pointer h-15"
                onChange={handleChange}
              />
            </label>
            <div className="flex object-cover py-2">
              {user && !avatar && (
                <img
                  className="m-auto h-80"
                  src={`${staticFilesURL}/${user.avatar}`}
                  alt="image"
                />
              )}

              {avatar && (
                <img src={URL.createObjectURL(avatar as File)} alt="avatar" />
              )}
            </div>
            <label className="text-md text-primary" htmlFor="name">
              name:
              <input
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="name"
                className="input mb-5"
              />
            </label>
            <label className="text-md text-primary" htmlFor="description">
              description:
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleChange}
                placeholder="description"
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
                Применить
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default MyProfilePage;
