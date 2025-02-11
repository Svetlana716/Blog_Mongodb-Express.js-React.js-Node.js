import { ObjectId } from "mongoose";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

declare module "jsonwebtoken" {
  export interface UserJwtPayload extends JwtPayload {
    userId: string;
  }
}
