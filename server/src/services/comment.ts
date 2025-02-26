import CommentModel from "../models/comment";
import PostModel from "../models/post";
import ApiError from "../errors/ApiError";
import UserModel from "../models/user";
import UserDto from "../dtos/user";
import { IComment } from "types/IComment";

class CommentService {
  async create(userId: string, postId: string, comment: IComment) {
    const user = await UserModel.findById(userId).orFail(
      ApiError.NotFoundError(`Нет пользователя с id: ${userId}`)
    );

    const { text } = comment;
    if (!text) {
      throw ApiError.BadRequest("Комментарий не может быть пустым");
    }
    const userDto = new UserDto(user);
    const newComment = await CommentModel.create({ text, author: userDto });

    await PostModel.findByIdAndUpdate(postId, {
      $push: { comments: newComment },
    });

    return newComment;
  }

  async getAll(postId: string) {
    if (!postId) {
      throw ApiError.BadRequest("Пост не найден");
    }
    const post = await PostModel.findById(postId);

    if (post && post.comments) {
      return await Promise.all(
        post.comments.map((comment) => {
          return CommentModel.findById(comment._id);
        })
      );
    }
    throw ApiError.BadRequest(`Нет комментариев`);
  }
}

export default new CommentService();
