import { Link, NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAuthInfoPath } from "../store/auth/selectors";
import { fetchLogoutUser } from "../store/auth/actions";
import { CgLaptop } from "react-icons/cg";
import useResize from "../hooks/useResize";
import { useState } from "react";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(getAuthInfoPath);

  const activeStyles = {
    color: "white",
  };

  const handleLogout = () => {
    dispatch(fetchLogoutUser());
  };

  const { isMobile } = useResize();

  return (
    <div className="flex py-4 justify-between items-center">
      <Link to={"/"}>
        <CgLaptop color="white" size={!isMobile ? 50 : 40} />
      </Link>
      {isAuth && (
        <nav>
          <section className="MOBILE-MENU flex sm:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev: boolean) => !prev)} // toggle isNavOpen state on click
            >
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hidden"}>
              <div
                className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
              >
                <svg
                  className="h-8 w-8 text-gray-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
              <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-full py-50">
                <li>
                  <Link
                    to="/"
                    onClick={() => setIsNavOpen(false)}
                    className="text-lg  font-semibold  text-gray-400 hover:text-white"
                  >
                    Главная
                  </Link>
                </li>
                <li>
                  <Link
                    to="/myPosts"
                    onClick={() => setIsNavOpen(false)}
                    className="text-lg font-semibold  text-gray-400 hover:text-white"
                  >
                    Мои посты
                  </Link>
                </li>
                <li>
                  <Link
                    to="/posts/new"
                    onClick={() => setIsNavOpen(false)}
                    className="text-lg font-semibold  text-gray-400 hover:text-white"
                  >
                    Добавить пост
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex justify-center items-center bg-gray-600 text-xs text-white font-semibold rounded-sm px-4 py-2"
                  >
                    Выйти
                  </button>
                </li>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden space-x-8 sm:flex">
            <li>
              <NavLink
                to="/"
                className="text-lg font-semibold  text-gray-400 hover:text-white"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myPosts"
                className="text-lg font-semibold  text-gray-400 hover:text-white"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Мои посты
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/posts/new"
                className="text-lg font-semibold  text-gray-400 hover:text-white"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Добавить пост
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      {isAuth && !isMobile && (
        <button
          onClick={handleLogout}
          className="flex justify-center items-center bg-gray-600 text-xs text-white font-semibold rounded-sm px-4 py-2"
        >
          Выйти
        </button>
      )}
      {!isAuth && (
        <Link
          to="/login"
          className="flex justify-center items-center bg-gray-600 text-xs text-white font-semibold rounded-sm px-4 py-2"
        >
          Войти
        </Link>
      )}
    </div>
  );
};
export default Header;
