import express, { Express } from "express";
import "dotenv/config";
import userRouter from "./routes/user";
import connectToDB from "./config/database";

const app: Express = express();

app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  connectToDB();
  console.log(`Listening on port ${process.env.PORT}`);
});
