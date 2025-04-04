import { useEffect } from 'react';
import { SideBar } from '../components/SideBar';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchGetPosts } from '../store/posts/actions';
import { getPostInfoPath } from '../store/posts/selectors';
import PostItem from '../components/PostItem';
import useResize from '../hooks/useResize';

const MainPage = () => {
  const dispatch = useAppDispatch();
  const { posts, popularPosts } = useAppSelector(getPostInfoPath);
  const { isDesktop } = useResize();

  useEffect(() => {
    dispatch(fetchGetPosts());
  }, [dispatch]);

  if (posts.length === 0) {
    return <p className="text-xl text-center text-white py-10">Нет постов</p>;
  }

  return (
    <div className="flex justify-between gap-8">
      <ul className="flex flex-col gap-10 md:basis-1/1 pt-10 list-none m-0">
        {posts?.map((post) => (
          <li key={post._id}>
            <PostItem post={post} />
          </li>
        ))}
      </ul>
      {isDesktop && <SideBar posts={popularPosts} />}
    </div>
  );
};
export default MainPage;
