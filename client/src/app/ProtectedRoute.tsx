import { Navigate, useLocation } from "react-router";
import { getAuthInfoPath } from "../store/auth/selectors";
import { useAppSelector } from "../store/hooks";

type Props = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

type Argument = {
  component: JSX.Element;
};

const Protected = ({ onlyUnAuth = false, component }: Props) => {
  const { isAuth, isLoading } = useAppSelector(getAuthInfoPath);

  const location = useLocation();

  // Запрос еще выполняется
  if (isLoading) {
    <p>"Загрузка..."</p>;
  }

  // Пользователь авторизован, но роут предназначен для неавторизованного пользователя
  if (onlyUnAuth && isAuth) {
    // Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  // Пользователь неавторизован, a роут для авторизованного пользователя
  if (!onlyUnAuth && !isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: Argument) => (
  <Protected onlyUnAuth={true} component={component} />
);
