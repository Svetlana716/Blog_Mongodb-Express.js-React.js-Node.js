import { Router } from "express";
import { body } from "express-validator";
import auth from "../middlewares/auth";
import PostController from "../controllers/posts";
import UserController from "../controllers/auth";
import { upload } from "../services/file";

const router = Router({ mergeParams: true });

//users
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
router.get("/users", auth, UserController.getAll);

//posts
router.post("/posts", auth, upload.single("picture"), PostController.create); // в upload.single("название поля формы")
router.get("/posts", auth, PostController.getAll);
router.get("/posts/:id", auth, PostController.getOne);
router.put("/posts", auth, PostController.update);
router.delete("/posts/:id", auth, PostController.delete);

export default router;

/* router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Запрашиваемый ресурс не найден"));
}); */
