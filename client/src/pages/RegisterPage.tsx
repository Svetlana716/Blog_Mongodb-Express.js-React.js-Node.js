import { Link } from "react-router";
import { useForm } from "../hooks/useForm";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAuthInfoPath } from "../store/auth/selectors";
import { fetchRegistrationUser } from "../store/auth/actions";

interface IInput {
  name: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(getAuthInfoPath);

  const { values, handleChange } = useForm<IInput>({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = values;

  const handleRegisterUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchRegistrationUser({ name, email, password }));
  };
  return (
    <form
      onSubmit={handleRegisterUser}
      className="w-9/10 sm:w-2/3 lg:w-1/3 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-primary font-semibold text-center">
        Регистрация
      </h1>
      <label className="text-md text-primary" htmlFor="name">
        имя:
        <input
          id="name"
          type="text"
          placeholder="имя"
          value={name}
          name={"name"}
          onChange={handleChange}
          className="input mb-5"
        />
      </label>
      <label className="text-md text-primary" htmlFor="email">
        email:
        <input
          id="email"
          type="text"
          placeholder="email"
          value={email}
          name={"email"}
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
          name={"password"}
          onChange={handleChange}
          className="input mb-5"
        />
      </label>

      {isLoading && <p>"Загрузка..."</p>}
      {error && <p className="text-md text-red">{error}</p>}

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          className="flex justify-center items-center bg-secondary text-md text-primary font-semibold rounded-sm px-4 py-2"
        >
          Подтвердить
        </button>
        <Link
          to="/login"
          className="flex justify-center items-center text-lg text-primary font-semibold"
        >
          Уже зарегистрированы?
        </Link>
      </div>
    </form>
  );
};
export default RegisterPage;
