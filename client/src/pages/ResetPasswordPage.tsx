import { Link, useNavigate } from 'react-router';
import { fetchResetPassword } from '../store/auth/actions';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAuthInfoPath } from '../store/auth/selectors';
import { useForm } from '../hooks/useForm';
import { IResetPassword } from '../models/auth';
import ErrorMessage from '../components/ErrorMessage';

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useAppSelector(getAuthInfoPath);

  const { values, handleChange } = useForm<IResetPassword>({
    code: '',
    newPassword1: '',
    newPassword2: '',
  });

  const { code, newPassword1, newPassword2 } = values;

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchResetPassword({ code, newPassword1, newPassword2 }));
    if (!isLoading && !error) {
      navigate('/login', { replace: true });
    }
  };

  return (
    <form
      onSubmit={handleResetPassword}
      className="w-9/10 sm:w-2/3 lg:w-1/3 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-primary font-semibold text-center">
        Восстановление пароля
      </h1>
      <label className="text-md text-primary" htmlFor="code">
        Код из письма:
        <input
          id="code"
          type="text"
          name="code"
          value={code}
          onChange={handleChange}
          placeholder="Введите код из письма"
          className="input mb-5"
        />
      </label>
      <label className="text-md text-primary" htmlFor="newPassword1">
        Новый пароль:
        <input
          id="newPassword1"
          type="password"
          name="newPassword1"
          value={newPassword1}
          onChange={handleChange}
          placeholder="Новый пароль"
          className="input mb-5"
        />
      </label>
      <label className="text-md text-primary" htmlFor="newPassword2">
        Новый пароль ещё раз:
        <input
          id="newPassword2"
          type="password"
          name="newPassword2"
          value={newPassword2}
          onChange={handleChange}
          placeholder="Новый пароль"
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
          Сохранить
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
export default ResetPasswordPage;
