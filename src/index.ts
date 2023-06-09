import express, { Express } from "express";
import "dotenv/config";
import userRouter from "./routes/user";

const app: Express = express();

app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
