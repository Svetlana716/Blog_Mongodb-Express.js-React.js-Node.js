import { Link, NavLink, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAuthInfoPath } from "../store/auth/selectors";
import { fetchLogoutUser } from "../store/auth/actions";
import { CgLaptop } from "react-icons/cg";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAppSelector(getAuthInfoPath);

  const activeStyles = {
    color: "white",
  };

  const handleLogout = () => {
    dispatch(fetchLogoutUser());
    navigate("user/signin");
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <Link to={"/"}>
        <CgLaptop color="white" size={50} />
      </Link>
      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to="/"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myPosts"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Мои посты
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts/new"
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Добавить пост
            </NavLink>
          </li>
        </ul>
      )}
      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? (
          <button onClick={handleLogout}>Выйти</button>
        ) : (
          <Link to="user/signin">Войти</Link>
        )}
      </div>
    </div>
  );
};
export default Navbar;
