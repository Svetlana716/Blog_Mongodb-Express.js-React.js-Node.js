import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { FC } from "react";
import { useForm } from "../hooks/useForm";
import { fetchLoginUser } from "../store/auth/actions";
import { getAuthInfoPath } from "../store/auth/selectors";

interface IInput {
  email: string;
  password: string;
}

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector(getAuthInfoPath);

  const { values, handleChange } = useForm<IInput>({
    email: "",
    password: "",
  });

  const { email, password } = values;

  const handleLoginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchLoginUser({ email, password }));
  };
  return (
    <form
      onSubmit={handleLoginUser}
      className="w-3/4 sm:w-2/3 lg:w-1/3 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-white text-center">Авторизация</h1>
      <label className="text-xs text-gray-400" htmlFor="">
        email:
        <input
          type="text"
          placeholder="email"
          value={email}
          name={"email"}
          onChange={handleChange}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-50"
        />
      </label>
      <label className="text-xs text-gray-400" htmlFor="">
        password:
        <input
          type="password"
          placeholder="password"
          value={password}
          name={"password"}
          onChange={handleChange}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-50"
        />
      </label>

      {isLoading && <p>"Загрузка..."</p>}
      {error && <p>{error}</p>}

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
        >
          Войти
        </button>
        <Link
          to="/register"
          className="flex justify-center items-center text-xs text-white"
        >
          Нет аккаунта?
        </Link>
      </div>
    </form>
  );
};
export default LoginPage;
