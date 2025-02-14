import CommentModel from "../models/comment";
import PostModel from "../models/post";
import ApiError from "../errors/ApiError";
import { IComment } from "types/IComment";

class CommentService {
  async create(userId: string, postId: string, comment: IComment) {
    const { text } = comment;

    if (!text) {
      throw ApiError.BadRequest("Комментарий не может быть пустым");
    }
    const newComment = await CommentModel.create({ text, author: userId });

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

  /*async getOne(id: string) {
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
  } */
}

export default new CommentService();
