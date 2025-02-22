import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";
//import { errorLogger } from "express-winston";
import { errors } from "celebrate";
import cookieParser from "cookie-parser";
import router from "./routes";
import { requestLogger } from "./middlewares/logger";
import { error } from "./middlewares/error";
import path from "path";

const { PORT = 5000, MONGO_URL = "", CLIENT_URL } = process.env;

const app = express();

//middlevare
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", router);

app.use(errors());
app.use(error);
//app.use(errorLogger);

const connect = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

connect();
