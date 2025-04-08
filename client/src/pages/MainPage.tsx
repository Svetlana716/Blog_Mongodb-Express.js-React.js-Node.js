import { useEffect } from 'react';
import { SideBar } from '../components/SideBar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchGetPosts } from '../store/posts/actions';
import { getPostInfoPath } from '../store/posts/selectors';
import PostItem from '../components/PostItem';
import useResize from '../hooks/useResize';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { posts, popularPosts, isLoading, error } =
    useAppSelector(getPostInfoPath);
  const { isDesktop } = useResize();

  useEffect(() => {
    dispatch(fetchGetPosts());
  }, [dispatch]);

  if (!posts) {
    return (
      <p className="font-semibold text-primary text-lg text-hover text-center py-10">
        Нет постов
      </p>
    );
  }

  return (
    <>
      {isLoading && <p>"loading"</p>} {error && <p>{error}</p>}
      <div className="flex justify-between gap-8">
        {posts ? (
          <ul className="flex flex-col gap-10 md:basis-1/1 pt-10 list-none m-0">
            {posts?.map((post) => (
              <li key={post._id}>
                <PostItem post={post} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-semibold text-primary text-lg text-hover text-center py-10">
            Нет постов
          </p>
        )}
        {isDesktop && <SideBar posts={popularPosts} />}
      </div>
    </>
  );
};
export default MainPage;
