import { Link, useNavigate, useParams } from "react-router";
import {
  AiFillDelete,
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
} from "react-icons/ai";
import FormatDate from "../utils/FormatDate";
import { staticFilesURL } from "../utils/constants";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchDeletePost, fetchGetPostById } from "../store/posts/actions";
import { getAuthInfoPath } from "../store/auth/selectors";
import { getPostInfoPath } from "../store/posts/selectors";
import { useEffect } from "react";
import Comments from "../components/CommentForm";
import { IoArrowBackOutline } from "react-icons/io5";
import ErrorMessage from "../components/ErrorMessage";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(getAuthInfoPath);
  const { posts, currentPost, isLoading, error } =
    useAppSelector(getPostInfoPath);

  const post = posts.find((post) => post._id === id) || currentPost;

  useEffect(() => {
    if (!post && id) {
      dispatch(fetchGetPostById(id));
    }
  }, [post, id, dispatch]);

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">Нет поста</div>
    );
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleDeletePost = (id: string | undefined) => {
    dispatch(fetchDeletePost(id));
    if (!error && !isLoading) {
      navigate("/myPosts");
    }
  };

  return (
    <>
      <IoArrowBackOutline
        className="text-primary text-hover"
        size={25}
        onClick={handleBackClick}
      />
      {isLoading ? (
        <p>"loading"</p>
      ) : error ? (
        <ErrorMessage>{error}</ErrorMessage>
      ) : (
        <div className="flex max-lg:flex-col gap-10 py-8">
          <div className="w-full text-primary text-md">
            <div className="flex flex-col flex-grow">
              <div
                className={
                  post?.picture ? "flex rouded-sm h-80" : "flex rounded-sm"
                }
              >
                {post?.picture && (
                  <img
                    src={`${staticFilesURL}/${post.picture}`}
                    alt="img"
                    className="object-cover w-full"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <p className="opacity-50">{post.title}</p>
              <p className=" opacity-50">
                {FormatDate.dayMonthYear(post.createdAt)}
              </p>
            </div>
            <p className=" text-xl">{post.title}</p>
            <p className="opacity-60 text-xs pt-4 line-clamp-4">{post.text}</p>

            <div className="flex gap-3 items-center mt-2 justify-between">
              <div className="flex gap-3 items-center mt-2">
                <div className="flex items-center justify-center gap-2  opacity-50">
                  <AiFillEye /> <span>{post.views}</span>
                </div>
                <div className="flex items-center justify-center gap-2  opacity-50">
                  <AiOutlineMessage />{" "}
                  <span>{post.comments?.length || 0} </span>
                </div>
              </div>

              {user?.id === post.author && (
                <div className="flex gap-3 mt-4">
                  <Link to={`/posts/${id}/edit`}>
                    <AiTwotoneEdit
                      size={30}
                      className="text-primary text-hover"
                    />
                  </Link>
                  <button onClick={() => handleDeletePost(id)}>
                    <AiFillDelete
                      size={30}
                      className="text-primary text-hover"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
          <Comments id={post._id} />
        </div>
      )}
    </>
  );
};
export default PostPage;
