import express, { Express } from "express";
import "dotenv/config";
import userRouter from "./routes/user";
import connectToDB from "./configs/database";
import cors from "cors";
import getCorsOptions from "./configs/cors";
import helmet from "helmet";
import session from "express-session";
import MongoStore  from "connect-mongo";

const app: Express = express();

app.use(helmet());
app.use(cors(getCorsOptions()));
app.use(express.json());

app.use("/users", userRouter);
app.use("/emplpoyees", userRouter);

app.listen(process.env.PORT, () => {
  connectToDB();
  console.log(`Listening on port ${process.env.PORT}`);
});
