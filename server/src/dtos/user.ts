class UserDto {
  email;
  id;

  constructor(model: any) {
    this.id = model._id;
    this.email = model.email;
  }
}

export default UserDto;
