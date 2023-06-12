import express, { Express } from "express";
import "dotenv/config";
import userRouter from "./routes/user";
import connectToDB from "./config/database";
import cors from "cors";
import getCorsOptions from "./config/cors";
import helmet from "helmet";

const app: Express = express();

app.use(helmet());
app.use(cors(getCorsOptions()));

app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  connectToDB();
  console.log(`Listening on port ${process.env.PORT}`);
});
