import { useEffect } from "react";
import { SideBar } from "../components/SideBar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchGetPosts } from "../store/posts/actions";
import { getPostInfoPath } from "../store/posts/selectors";
import PostItem from "../components/PostItem";

const MainPage = () => {
  const dispatch = useAppDispatch();

  const { posts, popularPosts } = useAppSelector(getPostInfoPath);

  useEffect(() => {
    dispatch(fetchGetPosts());
  }, [dispatch]);

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {posts?.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
        <div className="basis-1/5">
          <div className="text-xs uppercase text-white">Популярное:</div>

          {popularPosts?.map((post) => (
            <SideBar key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default MainPage;
