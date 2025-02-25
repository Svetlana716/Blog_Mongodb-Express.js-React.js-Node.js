import { useAppDispatch, useAppSelector } from "../store/hooks";
import { FC } from "react";
import { getUserInfoPath } from "../store/users/selectors";
import { useForm } from "../hooks/useForm";
import ErrorMessage from "./ErrorMessage";
import { fetchChangePassword } from "../store/auth/actions";
import { IPasswordChange } from "../models/auth";
import Accordion from "../UI/Accordeon";

const PasswordChangeForm: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(getUserInfoPath);
  const { values, handleChange } = useForm<IPasswordChange>({
    currentPassword: "",
    newPassword1: "",
    newPassword2: "",
  });

  const { currentPassword, newPassword1, newPassword2 } = values;

  const handleEditEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      fetchChangePassword({ currentPassword, newPassword1, newPassword2 })
    );
  };

  return (
    <Accordion title="Изменить пароль">
      <form className="p-1 mt-3" onSubmit={handleEditEmail}>
        <label className="text-md text-primary" htmlFor="currentPassword">
          Текущий пароль:
          <input
            id="currentPassword"
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
            placeholder="Текущий пароль"
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

        <div className="flex gap-8 items-center justify-center mt-4">
          <button
            type="submit"
            className="button text-md text-primary block-hover outline-2 bg-primary"
          >
            Применить
          </button>
        </div>
      </form>
    </Accordion>
  );
};
export default PasswordChangeForm;
