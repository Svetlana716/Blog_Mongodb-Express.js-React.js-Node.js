import { Router } from "express";
import { body } from "express-validator";
import auth from "../middlewares/auth";
import PostController from "../controllers/posts";
import UserController from "../controllers/users";
import CommentController from "../controllers/comment";
import { upload } from "../services/file";

const router = Router({ mergeParams: true });

//auth
router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  UserController.register
);
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  UserController.login
);
router.post("/logout", UserController.logout);
router.get("/refresh", UserController.refresh);

//users
router.get("/users", auth, UserController.getAll);

//posts
router.post("/posts", auth, upload.single("picture"), PostController.create); // в upload.single("название поля формы")
router.get("/posts", PostController.getAll);
router.get("/posts/my", auth, PostController.getMy);
router.put("/posts/:id", auth, upload.single("picture"), PostController.update);
router.get("/posts/:id", PostController.getOne);
router.delete("/posts/:id", auth, PostController.delete);

//comments
router.post("/comments/:id", auth, CommentController.create);
router.get("/comments/:id", CommentController.getAll);

export default router;

/* router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Запрашиваемый ресурс не найден"));
}); */
