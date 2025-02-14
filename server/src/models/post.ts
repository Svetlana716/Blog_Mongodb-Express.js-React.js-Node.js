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
      default: "",
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
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

/* link: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => validator.isURL(v),
        message: "Введен не валидный URL",
      },
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    likes: {
      type: [{ type: Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }, */
