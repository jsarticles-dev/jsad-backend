import express, { Router } from "express";
import {
  addUser,
  deleteUser,
  findAllUsers,
  findUser,
} from "../controller/user";

const userRouter: Router = express.Router();

/* GET Requests */
userRouter.get("/:id", findUser);
userRouter.get("/", findAllUsers);

/* POST Requests */
userRouter.post("/", addUser);

/* DELETE  Requests */
userRouter.delete("/:id", deleteUser);

export default userRouter;
