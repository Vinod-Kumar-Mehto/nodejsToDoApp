import express from "express";
import userRouter from "./Routes/user.js";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./Routes/task.js";
import ErrorHandler from "./Middlewares/error.js";
import cors from "cors";
export const app = express();
dotenv.config({
  path: "./Data/config.env",
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

app.use(new ErrorHandler());
