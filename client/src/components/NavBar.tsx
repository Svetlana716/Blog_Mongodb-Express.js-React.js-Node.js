import { FC } from "react";
import { NavLink } from "react-router";
import { useTheme } from "../hooks/useTheme";

interface Props {
  links: {
    heading: string;
    link: string;
  }[];
  styles?: string | undefined;
}

const NavBar: FC<Props> = ({ links, styles }) => {
  const { darkTheme } = useTheme();

  const activeStyles = {
    color: darkTheme ? "#d6e736" : "#FAFAFA",
  };
  return (
    <nav className={styles}>
      <ul className={`space-x-8 flex`}>
        {links.map((el, i) => (
          <li key={i}>
            <NavLink
              to={el.link}
              className="font-semibold text-primary text-lg text-hover"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              {el.heading}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default NavBar;
