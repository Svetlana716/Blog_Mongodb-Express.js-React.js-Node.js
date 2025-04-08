import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getUserInfoPath } from '../store/users/selectors';
import { useForm } from '../hooks/useForm';
import { ICoreSettingsFormInput } from '../utils/types';
import { fetchEditMe, fetchGetMe } from '../store/users/actions';
import ErrorMessage from './ErrorMessage';

const CoreSettingsForm = () => {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector(getUserInfoPath);

  useEffect(() => {
    if (!user) {
      dispatch(fetchGetMe());
    }
  }, [dispatch, user]);

  const { values, handleChange, setNewValues } =
    useForm<ICoreSettingsFormInput>({
      name: '',
      description: '',
      avatar: '',
    });

  useEffect(() => {
    if (user) {
      setNewValues({
        name: user.name,
        description: user.description,
        avatar: '',
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

  return (
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
        {user.avatar && !avatar && (
          <img
            className="m-auto h-80"
            src={`${import.meta.env.VITE_URL}/uploads/${user.avatar}`}
            alt="avatar"
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
          className="button text-md text-primary block-hover outline-2 bg-primary"
        >
          Применить
        </button>
      </div>
    </form>
  );
};
export default CoreSettingsForm;
