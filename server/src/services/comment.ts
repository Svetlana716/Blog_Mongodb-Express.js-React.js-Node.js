import { model, Schema } from "mongoose";
import { IComment } from "types/IComment";

const commentSchema = new Schema<IComment>(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true, // чтобы видеть дату создания поста
  }
);

export default model("comment", commentSchema);
