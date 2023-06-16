import express, { Router } from "express";
import {
  addUser,
  deleteUser,
  findAllUsers,
  findUser,
} from "../controller/user";
import isEmployeeAuthenticated from "../middlewares/EmployeeAuthentication";
import { EMPLOYEE_ROLES } from "../constants/generalConstants";
import authorizationMiddleware from "../middlewares/EmployeeAuthorization";

const userRouter: Router = express.Router();

/* GET Requests */
userRouter.get(
  "/:id",
  isEmployeeAuthenticated,
  authorizationMiddleware([EMPLOYEE_ROLES.ADMIN, EMPLOYEE_ROLES.EDITOR]),
  findUser
);
userRouter.get(
  "/",
  isEmployeeAuthenticated,
  authorizationMiddleware([EMPLOYEE_ROLES.ADMIN, EMPLOYEE_ROLES.EDITOR]),
  findAllUsers
);

/* POST Requests */
userRouter.post("/", addUser);

/* DELETE  Requests */
userRouter.delete("/:id", deleteUser);

export default userRouter;
