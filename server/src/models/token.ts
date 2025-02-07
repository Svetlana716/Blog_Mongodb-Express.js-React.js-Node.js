import { Schema, model, Model, Document } from "mongoose";
import { IToken } from "../types/token";

const tokenSchema = new Schema<IToken>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true, // чтобы видеть дату создания
  }
);

export default model<IToken>("token", tokenSchema);
