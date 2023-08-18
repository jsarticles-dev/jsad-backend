import express, { Express } from "express";
import "dotenv/config";
import userRouter from "./routes/user";
import cors from "cors";
//import getCorsOptions from "./configs/cors";
import helmet from "helmet";
import employeeRouter from "./routes/employee";
import newsletterRouter from "./routes/newsletter";
import authRouter from "./routes/auth";

const app: Express = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/employees", employeeRouter);
app.use("/newsletters", newsletterRouter);
app.get("/health", (req, res) => res.status(200).send("I'm alive!"));

export { app };
