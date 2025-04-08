import { Link } from 'react-router';
import { FC } from 'react';
import { IUser } from '../models/user';

interface Props {
  user: IUser;
}

const Avatar: FC<Props> = ({ user }) => {
  const avatar = user?.name
    .split(' ')
    .map((el) => el[0].toUpperCase())
    .slice(0, 2)
    .join('');
  return (
    <Link
      to="/myProfile/core"
      className="flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-red-100 text-sm"
    >
      {user!.avatar ? (
        <img
          src={`${import.meta.env.VITE_URL}/uploads/${user!.avatar}`}
          alt="avatar"
          className="rounded-full w-10 h-10"
        />
      ) : (
        avatar
      )}
    </Link>
  );
};
export default Avatar;
