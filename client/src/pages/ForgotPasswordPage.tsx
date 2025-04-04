import { Link, useNavigate } from 'react-router';
import ErrorMessage from '../components/ErrorMessage';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthInfoPath } from '../store/auth/selectors';
import { useForm } from '../hooks/useForm';
import { fetchSendResetPasswordCode } from '../store/auth/actions';

interface IInput {
  email: string;
}

const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(getAuthInfoPath);
  const navigate = useNavigate();

  const { values, handleChange } = useForm<IInput>({
    email: '',
  });

  const { email } = values;

  const handleSendResetPasswordCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchSendResetPasswordCode({ email }));
    navigate('/reset-password', { replace: true });
  };

  return (
    <form
      onSubmit={handleSendResetPasswordCode}
      className="w-9/10 sm:w-2/3 lg:w-1/3 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-primary font-semibold text-center">
        Введите email
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

      {isLoading && <p>"Загрузка..."</p>}
      {error && <ErrorMessage>{error}</ErrorMessage>}

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          className="button bg-secondary text-md text-primary block-hover"
        >
          Восстановить
        </button>
        <Link
          to="/login"
          className="text-lg text-primary font-semibold text-hover"
        >
          Вспомнили пароль?
        </Link>
      </div>
    </form>
  );
};
export default ForgotPasswordPage;
