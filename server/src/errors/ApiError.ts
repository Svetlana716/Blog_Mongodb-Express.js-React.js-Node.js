import { constants } from "http2";
import { ValidationError } from "express-validator";

class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors: ValidationError[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(
      constants.HTTP_STATUS_UNAUTHORIZED,
      "Пользователь не авторизирован"
    );
  }

  static BadRequest(message: string, errors: ValidationError[] = []) {
    return new ApiError(constants.HTTP_STATUS_BAD_REQUEST, message, errors);
  }

  static ForbiddenError() {
    return new ApiError(constants.HTTP_STATUS_FORBIDDEN, "Доступ запрещён");
  }

  static NotFoundError(message: string) {
    return new ApiError(constants.HTTP_STATUS_NOT_FOUND, message);
  }
}

export default ApiError;
