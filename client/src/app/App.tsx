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
import { OnlyAuth, OnlyUnAuth } from "./ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage";
import MyProfilePage from "../pages/MyProfilePage";

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
        <Route
          path="register"
          element={<OnlyUnAuth component={<RegisterPage />} />}
        />
        <Route
          path="login"
          element={<OnlyUnAuth component={<LoginPage />} />}
        />
        <Route
          path="myProfile"
          element={<OnlyAuth component={<MyProfilePage />} />}
        />
        <Route path="/" element={<MainPage />} />
        <Route path="posts/:id" element={<PostPage />} />

        <Route
          path="myPosts"
          element={<OnlyAuth component={<MyPostsPage />} />}
        />
        <Route
          path="posts/:id/edit"
          element={<OnlyAuth component={<EditPostPage />} />}
        />
        <Route
          path="posts/new"
          element={<OnlyAuth component={<AddPostPage />} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
