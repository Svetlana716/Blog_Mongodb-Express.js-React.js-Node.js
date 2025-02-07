import { Schema, model } from "mongoose";
import { ICard } from "types/cards";
import validator from "validator";

const cardSchema = new Schema<ICard>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    link: {
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
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default model("card", cardSchema);
