import express, { Router } from "express";
import {
  addUser,
  deleteUser,
  findAllUsers,
  findUser,
} from "../controller/user";
import isEmployeeAuthenticated from "../middlewares/EmployeeAuthentication";

const userRouter: Router = express.Router();

/* GET Requests */
userRouter.get("/:id", isEmployeeAuthenticated, findUser);
userRouter.get("/", isEmployeeAuthenticated, findAllUsers);

/* POST Requests */
userRouter.post("/", addUser);

/* DELETE  Requests */
userRouter.delete("/:id", deleteUser);

export default userRouter;
