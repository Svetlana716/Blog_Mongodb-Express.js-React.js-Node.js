import { useEffect } from 'react';
import PostItem from '../components/PostItem';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getPostInfoPath } from '../store/posts/selectors';
import { fetchGetMyPosts } from '../store/posts/actions';

const MyPostsPage = () => {
  const dispatch = useAppDispatch();

  const { myPosts, isLoading, error } = useAppSelector(getPostInfoPath);

  useEffect(() => {
    dispatch(fetchGetMyPosts());
  }, [dispatch]);

  return (
    <>
      {isLoading && <p>"loading"</p>} {error && <p>{error}</p>}
      {myPosts ? (
        <ul className="w-full lg:w-9/10 mx-auto py-10 flex flex-col gap-10">
          {myPosts?.map((post) => (
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
    </>
  );
};
export default MyPostsPage;
