import { Link, NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAuthInfoPath } from "../store/auth/selectors";
import { fetchLogoutUser } from "../store/auth/actions";
import { CgLaptop } from "react-icons/cg";
import useResize from "../hooks/useResize";
import { useState } from "react";
import { IoMoon, IoSunny } from "react-icons/io5";
import { useTheme } from "../hooks/useTheme";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(getAuthInfoPath);
  const { isMobile } = useResize();

  const { darkTheme, setDarkTheme } = useTheme();

  const activeStyles = {
    color: darkTheme ? "" : "##335B03",
  };

  const handleLogout = () => {
    dispatch(fetchLogoutUser());
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <Link to={"/"}>
        <CgLaptop
          className="text-primary text-hover"
          size={!isMobile ? 50 : 40}
        />
      </Link>
      {isAuth && (
        <nav>
          <section className="flex sm:hidden">
            <div
              className="space-y-2"
              onClick={() => setIsNavOpen((prev: boolean) => !prev)} // toggle isNavOpen state on click
            >
              <span className="block h-0.5 w-8 animate-pulse dark:bg-bg-primary bg-bg-primary-dark"></span>
              <span className="block h-0.5 w-8 animate-pulse dark:bg-bg-primary bg-bg-primary-dark"></span>
              <span className="block h-0.5 w-8 animate-pulse dark:bg-bg-primary bg-bg-primary-dark"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hidden"}>
              <div
                className="CROSS-ICON absolute top-0 right-0 px-8 py-8"
                onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
              >
                <svg
                  className="h-8 w-8 text-primary"
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
              <ul className="flex flex-col items-center justify-between min-h-full py-50">
                <li>
                  <button onClick={setDarkTheme}>
                    {darkTheme ? (
                      <IoSunny className="text-primary text-hover" size={40} />
                    ) : (
                      <IoMoon className="text-primary text-hover" size={40} />
                    )}
                  </button>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={() => setIsNavOpen(false)}
                    className="font-semibold text-primary text-lg text-hover"
                  >
                    Главная
                  </Link>
                </li>
                <li>
                  <Link
                    to="/myPosts"
                    onClick={() => setIsNavOpen(false)}
                    className="font-semibold text-primary text-lg text-hover"
                  >
                    Мои посты
                  </Link>
                </li>
                <li>
                  <Link
                    to="/posts/new"
                    onClick={() => setIsNavOpen(false)}
                    className="font-semibold text-primary text-lg text-hover"
                  >
                    Добавить пост
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="button bg-secondary text-md text-primary block-hover"
                  >
                    Выйти
                  </button>
                </li>
              </ul>
            </div>
          </section>

          <ul className="hidden space-x-8 sm:flex">
            <li>
              <NavLink
                to="/"
                className="font-semibold text-primary text-lg text-hover"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myPosts"
                className="font-semibold text-primary text-lg text-hover"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Мои посты
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/posts/new"
                className="font-semibold text-primary text-lg text-hover"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Добавить пост
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      {!isMobile && (
        <button onClick={setDarkTheme}>
          {darkTheme ? (
            <IoSunny className="text-primary text-hover" size={40} />
          ) : (
            <IoMoon className="text-primary text-hover" size={40} />
          )}
        </button>
      )}
      {isAuth && !isMobile && (
        <button
          onClick={handleLogout}
          className="button bg-secondary text-md text-primary block-hover"
        >
          Выйти
        </button>
      )}
      {!isAuth && (
        <Link
          to="/login"
          className="button bg-secondary text-md text-primary block-hover"
        >
          Войти
        </Link>
      )}
    </div>
  );
};
export default Header;
