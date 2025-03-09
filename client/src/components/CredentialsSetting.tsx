import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getUserInfoPath } from "../store/users/selectors";
import { fetchGetMe } from "../store/users/actions";
import EmailChangeForm from "./EmailChangeForm";
import PasswordChangeForm from "./PasswordChangeForm";

const CredentialsSettings = () => {
  const dispatch = useAppDispatch();
  const { user /* , isLoading, error */ } = useAppSelector(getUserInfoPath);

  useEffect(() => {
    if (!user) {
      dispatch(fetchGetMe());
    }
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="text-xl text-center text-white py-10">
        Такого пользователя не существует
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 py-5">
      <EmailChangeForm />
      <PasswordChangeForm />
    </div>
  );
};
export default CredentialsSettings;
