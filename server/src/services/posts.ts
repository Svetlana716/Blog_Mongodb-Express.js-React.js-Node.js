import PostModel from "../models/post";
import UserModel from "../models/user";
import ApiError from "../errors/ApiError";
import { IPost } from "types/IPost";

class PostService {
  async create(
    post: IPost,
    userId: string,
    picture: Express.Multer.File | undefined
  ) {
    const newPost = picture
      ? new PostModel({
          ...post,
          author: userId,
          picture: picture?.filename,
        })
      : new PostModel({ ...post, author: userId });
    await newPost.save();
    await UserModel.findByIdAndUpdate(userId, {
      $push: { posts: newPost },
    });

    return newPost;
  }

  async getAll() {
    const posts = await PostModel.find().sort({ createdAt: -1 });
    if (!posts) {
      throw ApiError.BadRequest("Нет постов");
    }
    const popularPosts = await PostModel.find().limit(5).sort("-views");
    return { posts, popularPosts };
  }

  async getOne(id: string) {
    const post = await PostModel.findByIdAndUpdate(id, {
      $inc: { views: 1 },
    }).orFail(ApiError.NotFoundError(`Нет карточки с id: ${id}`));
    return post;
  }

  async getMy(id: string) {
    const user = await UserModel.findById(id);
    if (user && user.posts) {
      return await Promise.all(
        user!.posts.map((post) => {
          return PostModel.findById(post._id);
        })
      );
    }
    throw ApiError.BadRequest(`Нет постов`);
  }

  async update(
    postId: string,
    userId: string,
    body: Partial<IPost>,
    picture: Express.Multer.File | undefined
  ) {
    const post = await PostModel.findById(postId);

    if (!post) {
      throw ApiError.NotFoundError("Нет поста");
    }

    if (post && post.author._id.toString() !== userId) {
      throw ApiError.BadRequest("Нельзя удалять чужие посты");
    }

    return await PostModel.findByIdAndUpdate(
      postId,
      picture ? { ...body, picture: picture?.filename } : body,
      { new: true }
    );
  }

  async delete(postId: string, userId: string) {
    if (!postId) {
      throw ApiError.BadRequest("id не передан");
    }
    const post = await PostModel.findById(postId);

    if (!post) {
      throw ApiError.NotFoundError("Нет поста");
    }

    if (post && post.author._id.toString() !== userId) {
      throw ApiError.BadRequest("Нельзя удалять чужие посты");
    }

    await UserModel.findByIdAndUpdate(userId, {
      $pull: { posts: postId },
    });
    return await post.deleteOne();
  }
}

export default new PostService();
