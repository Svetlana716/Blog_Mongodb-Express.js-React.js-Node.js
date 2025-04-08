import { FC } from 'react';
import { Link } from 'react-router';
import { IPost } from '../models/post';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';

interface Props {
  posts: IPost[];
}

export const SideBar: FC<Props> = ({ posts }) => {
  if (!posts) {
    return (
      <p className="font-semibold text-primary text-lg text-hover text-center py-10">
        Нет постов
      </p>
    );
  }

  return (
    <aside className="basis-2/5 bg-secondary rounded-sm p-5 box-border">
      <h2 className="text-lg font-semibold text-primary">Популярное:</h2>
      <ul className="list-none p-0 m-0">
        {posts?.map((post) => (
          <li
            key={post._id}
            className="first:border-none border-t-2 border-black border-solid mt-5 first:pt-0 pt-5 "
          >
            <article>
              <Link
                key={post._id}
                to={`/posts/${post._id}`}
                className="flex flex-col text-md p-2 text-primary text-hover"
              >
                {post.title}

                <div className="flex gap-3 items-center mt-2">
                  <div className="flex items-center justify-center gap-2 opacity-50">
                    <AiFillEye /> <span>{post.views}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 opacity-50">
                    <AiOutlineMessage />
                    <span>{post.comments?.length || 0} </span>
                  </div>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </aside>
  );
};
