import { Schema, model } from "mongoose";
import validator from "validator";
import { IUser } from "../types/IUser";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    description: {
      type: String,
      required: false,
      default: "",
      maxlength: 200,
    },
    avatar: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (v: string) => validator.isEmail(v),
        message: "Введен не валидный e-mail",
      },
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    resetPasswordCode: {
      type: String,
      required: false,
    },
    posts: [
      {
        required: false,
        type: Schema.Types.ObjectId,
        ref: "post",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true, // чтобы видеть дату создания поста
  }
);

export default model<IUser>("user", userSchema);
