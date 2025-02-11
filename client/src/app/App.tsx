import { Route, Routes } from "react-router";
import Layout from "../components/Layout";
import MainPage from "../pages/MainPage";
import PostPage from "../pages/PostPage";
import MyPostsPage from "../pages/MyPostsPage";
import AddPostPage from "../pages/AddPostPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import EditPostPage from "../pages/EditPostPage";
import { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { fetchCheckAuth } from "../store/auth/actions";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(fetchCheckAuth());
    }
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="myPosts" element={<MyPostsPage />} />
        <Route path="posts/:id" element={<PostPage />} />
        <Route path="posts/:id/edit" element={<EditPostPage />} />
        <Route path="posts/new" element={<AddPostPage />} />
        <Route path="user/signup" element={<RegisterPage />} />
        <Route path="user/signin" element={<LoginPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
