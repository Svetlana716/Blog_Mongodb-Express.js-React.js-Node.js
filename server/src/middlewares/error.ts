import ApiError from "../errors/ApiError";
import { ErrorRequestHandler } from "express";
import { constants } from "http2";

export const error: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res
    .status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .json({ message: "На сервере произошла ошибка" });
};
