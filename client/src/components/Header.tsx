import { Link, NavLink } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getAuthInfoPath } from "../store/auth/selectors";
import { fetchLogoutUser } from "../store/auth/actions";
import { CgLaptop } from "react-icons/cg";
import useResize from "../hooks/useResize";

const Header = () => {
  //const [isNavOpen, setIsNavOpen] = useState(false);
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
    <header className="flex py-4 justify-between items-center">
      <Link to={"/"}>
        <CgLaptop color="white" size={!isMobile ? 50 : 30} />
      </Link>
      {isAuth && (
        <nav>
          <ul className="flex gap-8">
            <li>
              <NavLink
                to="/"
                className="sm:text-lg text-xs  font-semibold  text-gray-400 hover:text-white"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Главная
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/myPosts"
                className="sm:text-lg text-xs font-semibold  text-gray-400 hover:text-white"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Мои посты
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/posts/new"
                className="sm:text-lg text-xs font-semibold  text-gray-400 hover:text-white"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Добавить пост
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      <div className="flex justify-center items-center bg-gray-600 text-xs text-white font-semibold rounded-sm px-4 py-2">
        {isAuth ? (
          <button onClick={handleLogout}>Выйти</button>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </div>
    </header>
  );
};
export default Header;
/* return (
    <div className="flex items-center justify-between border-b border-gray-400 py-8">
      <Link to={"/"}>
        <CgLaptop color="white" size={!isMobile ? 50 : 30} />
      </Link>
      {isAuth && (
        <nav>
          <section className="MOBILE-MENU flex lg:hidden">
            <div
              className="HAMBURGER-ICON space-y-2"
              onClick={() => setIsNavOpen((prev: boolean) => !prev)} // toggle isNavOpen state on click
            >
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
              <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            </div>

            <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
              {" "}
              // toggle class based on isNavOpen state
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
              <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]">
                <li className="border-b border-gray-400 my-8 uppercase">
                  <NavLink
                    to="/"
                    className="sm:text-lg text-xs  font-semibold  text-gray-400 hover:text-white"
                    style={({ isActive }) =>
                      isActive ? activeStyles : undefined
                    }
                  >
                    Главная
                  </NavLink>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase"></li>
                <li>
                  <NavLink
                    to="/myPosts"
                    className="sm:text-lg text-xs font-semibold  text-gray-400 hover:text-white"
                    style={({ isActive }) =>
                      isActive ? activeStyles : undefined
                    }
                  >
                    Мои посты
                  </NavLink>
                </li>
                <li className="border-b border-gray-400 my-8 uppercase"></li>
                <li>
                  <NavLink
                    to="/myPosts"
                    className="sm:text-lg text-xs font-semibold  text-gray-400 hover:text-white"
                    style={({ isActive }) =>
                      isActive ? activeStyles : undefined
                    }
                  >
                    Мои посты
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/posts/new"
                    className="sm:text-lg text-xs font-semibold  text-gray-400 hover:text-white"
                    style={({ isActive }) =>
                      isActive ? activeStyles : undefined
                    }
                  >
                    Добавить пост
                  </NavLink>
                </li>
              </ul>
            </div>
          </section>

          <ul className="DESKTOP-MENU hidden space-x-8 lg:flex">
            <li className="border-b border-gray-400 my-8 uppercase">
              <NavLink
                to="/"
                className="sm:text-lg text-xs  font-semibold  text-gray-400 hover:text-white"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Главная
              </NavLink>
            </li>
            <li className="border-b border-gray-400 my-8 uppercase"></li>
            <li>
              <NavLink
                to="/myPosts"
                className="sm:text-lg text-xs font-semibold  text-gray-400 hover:text-white"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Мои посты
              </NavLink>
            </li>
            <li className="border-b border-gray-400 my-8 uppercase"></li>
            <li>
              <NavLink
                to="/myPosts"
                className="sm:text-lg text-xs font-semibold  text-gray-400 hover:text-white"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Мои посты
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/posts/new"
                className="sm:text-lg text-xs font-semibold  text-gray-400 hover:text-white"
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Добавить пост
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      <div className="flex justify-center items-center bg-gray-600 text-xs text-white font-semibold rounded-sm px-4 py-2">
        {isAuth ? (
          <button onClick={handleLogout}>Выйти</button>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </div>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  ); */
