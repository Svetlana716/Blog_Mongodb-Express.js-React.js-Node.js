import { Schema, model } from "mongoose";
import { IComment } from "types/IComment";

const commentSchema = new Schema<IComment>(
  {
    text: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("comment", commentSchema);
