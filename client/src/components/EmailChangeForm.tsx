import { useAppDispatch, useAppSelector } from "../store/hooks";
//import { IUser } from "../models/user";
import { FC } from "react";
import { useForm } from "../hooks/useForm";
import ErrorMessage from "./ErrorMessage";
import { fetchChangeEmail } from "../store/auth/actions";
import { IEmailChange } from "../models/auth";
import Accordion from "../UI/Accordeon";
import { getAuthInfoPath } from "../store/auth/selectors";

const EmailChangeForm: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(getAuthInfoPath);
  const { values, handleChange, reset } = useForm<IEmailChange>({
    currentEmail: "",
    newEmail: "",
    password: "",
  });

  const { currentEmail, newEmail, password } = values;

  const handleEditEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(fetchChangeEmail({ currentEmail, newEmail, password }));
    if (error === null && !isLoading) {
      reset();
    }
  };

  return (
    <Accordion title="Изменить Email">
      <form className="p-1 mt-3" onSubmit={handleEditEmail}>
        <label className="text-md text-primary" htmlFor="currentEmail">
          Текущий email:
          <input
            id="currentEmail"
            type="text"
            name="currentEmail"
            value={currentEmail}
            onChange={handleChange}
            placeholder="Текущий email"
            className="input mb-5"
          />
        </label>
        <label className="text-md text-primary" htmlFor="newEmail">
          Новый email:
          <input
            id="newEmail"
            type="text"
            name="newEmail"
            value={newEmail}
            onChange={handleChange}
            placeholder="Новый email"
            className="input mb-5"
          />
        </label>
        <label className="text-md text-primary" htmlFor="password">
          Пароль для подтверждения:
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Пароль"
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
export default EmailChangeForm;
