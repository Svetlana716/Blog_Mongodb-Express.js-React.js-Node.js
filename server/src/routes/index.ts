import {
  getUsers,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
} from "../controllers/users";
import { Router } from "express";
import { body } from "express-validator";
import auth from "../middlewares/auth";

const router = Router({ mergeParams: true });

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  registerUser
);
router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 6, max: 32 }),
  loginUser
);
router.post("/logout", logoutUser);
router.get("/refresh", refreshToken);
router.get("/users", auth, getUsers);

export default router;

/* router.use("/users", auth, userRouter);
router.use("/cards", auth, cardsRouter);

router.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError("Запрашиваемый ресурс не найден"));
}); */
