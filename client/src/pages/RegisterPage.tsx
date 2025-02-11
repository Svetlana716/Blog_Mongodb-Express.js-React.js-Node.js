import { Link, useNavigate } from "react-router";
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
  const navigate = useNavigate();
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
    navigate("/");
  };
  return (
    <form onSubmit={handleRegisterUser} className="w-1/4 h-60 mx-auto mt-40">
      <h1 className="text-lg text-white text-center">Регистрация</h1>
      <label className="text-xs text-gray-400" htmlFor="">
        name:
        <input
          type="text"
          placeholder="name"
          value={name}
          name={"name"}
          onChange={handleChange}
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-50"
        />
      </label>
      <label className="text-xs text-gray-400" htmlFor="">
        email:
        <input
          type="email"
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
          Подтвердить
        </button>
        <Link
          to="/user/signin"
          className="flex justify-center items-center text-xs text-white"
        >
          Уже зарегистрированы?
        </Link>
      </div>
    </form>
  );
};
export default RegisterPage;
