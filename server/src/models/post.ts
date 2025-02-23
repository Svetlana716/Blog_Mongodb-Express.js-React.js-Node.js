import { Schema, model } from "mongoose";
import { IPost } from "../types/IPost";

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    text: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    picture: {
      type: String,
      required: false,
      default: "",
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
    },
    views: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
        default: 0,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("post", postSchema);
