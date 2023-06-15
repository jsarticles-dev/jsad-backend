import express, { Express } from "express";
import "dotenv/config";
import userRouter from "./routes/user";
import connectToDB, { getConnectionString } from "./configs/database";
import cors from "cors";
import getCorsOptions from "./configs/cors";
import helmet from "helmet";
import session from "express-session";
import MongoStore from "connect-mongo";
import employeeRouter from "./routes/employee";
import logger from "./configs/logger";

const app: Express = express();

app.use(helmet());
app.use(cors(getCorsOptions()));

app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    store: MongoStore.create({ mongoUrl: getConnectionString() }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(express.json());

app.use("/users", userRouter);
app.use("/employees", employeeRouter);

app.listen(process.env.PORT, () => {
  logger.info(`Listening on port ${process.env.PORT}`);
  connectToDB();
});
