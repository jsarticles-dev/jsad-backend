import express, { Router } from "express";
import {
  deleteEmployee,
  findAllEmployees,
  findEmployee,
  loginAsEmployee,
  registerAsEmployee,
  updateEmployee,
} from "../controller/employee";
import isEmployeeAuthenticated from "../middlewares/EmployeeAuthentication";
import authorizationMiddleware from "../middlewares/EmployeeAuthorization";
import { EMPLOYEE_ROLES } from "../constants/generalConstants";

const employeeRouter: Router = express.Router();

/* GET requests */
employeeRouter.get(
  "/",
  isEmployeeAuthenticated,
  authorizationMiddleware([EMPLOYEE_ROLES.ADMIN, EMPLOYEE_ROLES.EDITOR]),
  findAllEmployees
);
employeeRouter.get(
  "/:id",
  isEmployeeAuthenticated,
  authorizationMiddleware([EMPLOYEE_ROLES.ADMIN]),
  findEmployee
);

/* POST requests  */
employeeRouter.post("/login", loginAsEmployee);
employeeRouter.post(
  "/register",
  isEmployeeAuthenticated,
  authorizationMiddleware([EMPLOYEE_ROLES.ADMIN]),
  registerAsEmployee
);

/* PATCH requests  */
employeeRouter.patch(
  "/:id",
  isEmployeeAuthenticated,
  authorizationMiddleware([EMPLOYEE_ROLES.ADMIN, EMPLOYEE_ROLES.EDITOR]),
  updateEmployee
);

/* DELETE requests */
employeeRouter.delete(
  "/:id",
  isEmployeeAuthenticated,
  authorizationMiddleware([EMPLOYEE_ROLES.ADMIN]),
  deleteEmployee
);

export default employeeRouter;
