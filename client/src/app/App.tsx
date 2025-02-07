import { Route, Routes } from "react-router";
import Layout from "../components/Layout";
import MainPage from "../pages/MainPage";
import PostPage from "../pages/PostPage";
import PostsPage from "../pages/PostsPage";
import AddPostPage from "../pages/AddPostPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import EditPostPage from "../pages/EditPostPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="posts" element={<PostsPage />} />
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
