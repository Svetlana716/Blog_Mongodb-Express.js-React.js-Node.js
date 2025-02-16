// для того чтобы на клиент отдавать только необходимые поля (без пароля)
class UserDto {
  id;
  email;

  constructor(model: any) {
    this.id = model._id;
    this.email = model.email;
  }
}

export default UserDto;
