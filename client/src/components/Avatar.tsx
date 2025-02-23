import { Link } from "react-router";
import { useAppSelector } from "../store/hooks";
import { FC } from "react";
import { getAuthInfoPath } from "../store/auth/selectors";

const Avatar: FC = () => {
  const { user } = useAppSelector(getAuthInfoPath);
  const avatar = user?.name
    .split(" ")
    .map((el) => el[0].toUpperCase())
    .slice(0, 2)
    .join("");
  return (
    <Link
      to="/myProfile"
      className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-red-100 text-sm"
    >
      {avatar}
    </Link>
  );
};
export default Avatar;
