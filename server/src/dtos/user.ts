import { IUser } from "types/IUser";

// для того чтобы на клиент отдавать только необходимые поля (без пароля)
class UserDto {
  id;
  email;
  name;
  avatar;
  isActivated;

  constructor(model: IUser) {
    this.id = model._id;
    this.email = model.email;
    this.name = model.name;
    this.avatar = model.avatar;
    this.isActivated = model.isActivated;
  }
}

export default UserDto;
