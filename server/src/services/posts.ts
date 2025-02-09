import PostModel from "../models/posts";
import UserModel from "../models/user";
import ApiError from "../errors/ApiError";
import { IPost } from "types/IPost";
import { JwtPayload } from "jsonwebtoken";

class PostService {
  async create(
    post: IPost,
    userId: JwtPayload,
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
    const posts = await PostModel.find().sort("-createdAt");
    if (!posts) {
      throw ApiError.BadRequest("Нет постов");
    }
    const popularPosts = await PostModel.find().limit(5).sort("-views");
    return { posts, popularPosts };
  }

  async getOne(_id: string) {
    return await PostModel.findById(_id).orFail(
      ApiError.NotFoundError(`Нет карточки с id: ${_id}`)
    );
  }

  async update(post: Partial<IPost>) {
    return await PostModel.findByIdAndUpdate(post._id, post, { new: true });
  }
}

export default new PostService();
