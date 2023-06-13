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

const employeeRouter: Router = express.Router();

/* GET requests */
employeeRouter.get("/", isEmployeeAuthenticated, findAllEmployees);
employeeRouter.get("/:id", isEmployeeAuthenticated, findEmployee);

/* POST requests  */
employeeRouter.post("/login", loginAsEmployee);
employeeRouter.post("/register", isEmployeeAuthenticated, registerAsEmployee);

/* PUT requests  */
employeeRouter.put("/:id", isEmployeeAuthenticated, updateEmployee);

/* DELETE requests */
employeeRouter.delete("/:id", isEmployeeAuthenticated, deleteEmployee);

export default employeeRouter;
