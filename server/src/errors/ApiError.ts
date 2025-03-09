import { constants } from "http2";
import { Error } from "mongoose";

class ApiError extends Error {
  public status: number;
  public error: Error | undefined;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static BadRequest(message: string) {
    return new ApiError(constants.HTTP_STATUS_BAD_REQUEST, message);
  }

  static UnauthorizedError() {
    return new ApiError(
      constants.HTTP_STATUS_UNAUTHORIZED,
      "Пользователь не авторизирован"
    );
  }

  static ForbiddenError() {
    return new ApiError(constants.HTTP_STATUS_FORBIDDEN, "Доступ запрещён");
  }

  static NotFoundError(message: string) {
    return new ApiError(constants.HTTP_STATUS_NOT_FOUND, message);
  }
}

export default ApiError;
