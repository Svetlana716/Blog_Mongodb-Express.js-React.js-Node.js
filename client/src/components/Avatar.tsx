import { Link } from "react-router";
import { useAppSelector } from "../store/hooks";
import { FC } from "react";
import { getUserInfoPath } from "../store/users/selectors";
import { staticFilesURL } from "../utils/constants";

const Avatar: FC = () => {
  const { user } = useAppSelector(getUserInfoPath);
  const avatar = user?.name
    .split(" ")
    .map((el) => el[0].toUpperCase())
    .slice(0, 2)
    .join("");
  return (
    <Link
      to="/myProfile/core"
      className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-red-100 text-sm"
    >
      {user ? (
        <img
          src={`${staticFilesURL}/${user!.avatar}`}
          alt="avatar"
          className="rounded-full"
        />
      ) : (
        avatar
      )}
    </Link>
  );
};
export default Avatar;
