import { Schema, model, Model, Document } from "mongoose";
import validator from "validator";
import { IUser } from "../types/user";

const userSchema = new Schema<IUser>(
  {
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
    /*     name: {
      type: String,
      required: false,
      default: "Жак-Ив Кусто",
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: false,
      default: "Исследователь",
      minlength: 2,
      maxlength: 200,
    },
    avatar: {
      type: String,
      required: false,
      validate: {
        validator: (v: string) => validator.isURL(v),
        message: "Введен не валидный URL",
      },
      default:
        "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    },

    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Posts",
      },
    ], */
  },
  {
    versionKey: false,
    timestamps: true, // чтобы видеть дату создания поста
  }
);

export default model<IUser>("user", userSchema);
/* interface UserModel extends Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<Document<unknown, any, IUser>>;
}
async function findUserByCredentials(
  this: UserModel,
  email: string,
  password: string
) {
  const user = await this.findOne({
    email,
  })
    .select("+password")
    .orFail(new AuthError("Неправильные почта или пароль"));
  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new AuthError("Неправильные почта или пароль");
  }
  return user;
}

userSchema.static("findUserByCredentials", findUserByCredentials); */
