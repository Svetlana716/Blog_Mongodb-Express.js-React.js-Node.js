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
      id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30,
      },
      avatar: {
        type: String,
        required: false,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("comment", commentSchema);
