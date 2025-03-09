import { NextFunction, Request, Response, Router } from "express";
import ApiError from "../errors/ApiError";
import postsRouter from "./posts";
import usersRouter from "./users";
import authRouter from "./auth";
import commentsRouter from "./comments";

const router = Router({ mergeParams: true });

router.use("/", authRouter);
router.use("/users", usersRouter);
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(ApiError.NotFoundError("Запрашиваемый ресурс не найден"));
});
export default router;
