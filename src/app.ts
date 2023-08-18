import express, { Express } from "express";
import "dotenv/config";
import userRouter from "./routes/user";
import { getConnectionString } from "./configs/database";
import cors from "cors";
//import getCorsOptions from "./configs/cors";
import helmet from "helmet";
import session from "express-session";
import MongoStore from "connect-mongo";
import employeeRouter from "./routes/employee";
import newsletterRouter from "./routes/newsletter";
import authRouter from "./routes/auth";

const app: Express = express();

app.use(helmet());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    store: MongoStore.create({ mongoUrl: getConnectionString() }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/employees", employeeRouter);
app.use("/newsletters", newsletterRouter);
app.get("/health", (req, res) => res.status(200).send("I'm alive!"));

export { app };
