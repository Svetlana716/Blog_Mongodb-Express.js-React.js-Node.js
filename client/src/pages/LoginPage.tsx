import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { FC } from 'react';
import { useForm } from '../hooks/useForm';
import { fetchLoginUser } from '../store/auth/actions';
import { getAuthInfoPath } from '../store/auth/selectors';
import ErrorMessage from '../components/ErrorMessage';

interface IInput {
  email: string;
  password: string;
}

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(getAuthInfoPath);

  const { values, handleChange } = useForm<IInput>({
    email: '',
    password: '',
  });

  const { email, password } = values;

  const handleLoginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchLoginUser({ email, password }));
  };
  return (
    <form
      onSubmit={handleLoginUser}
      className="w-9/10 sm:w-2/3 lg:w-1/3 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-primary font-semibold text-center">
        Авторизация
      </h1>
      <label className="text-md text-primary" htmlFor="email">
        email:
        <input
          id="email"
          type="text"
          placeholder="email"
          value={email}
          name={'email'}
          onChange={handleChange}
          className="input mb-5"
        />
      </label>
      <label className="text-md text-primary" htmlFor="password">
        пароль:
        <input
          id="password"
          type="password"
          placeholder="password"
          value={password}
          name={'password'}
          onChange={handleChange}
          className="input mb-3"
        />
      </label>

      {isLoading && <p>"Загрузка..."</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Link
        to="/forgot-password"
        className="text-lg text-primary font-semibold text-hover"
      >
        Забыли пароль?
      </Link>

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          className="button bg-secondary text-md text-primary block-hover"
        >
          Войти
        </button>
        <Link
          to="/register"
          className="text-lg text-primary font-semibold text-hover"
        >
          Нет аккаунта?
        </Link>
      </div>
    </form>
  );
};
export default LoginPage;
