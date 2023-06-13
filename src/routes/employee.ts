import express, { Router } from "express";
import {
  deleteEmployee,
  findAllEmployees,
  findEmployee,
  updateEmployee,
} from "../controller/employee";

const employeeRouter: Router = express.Router();

/* GET requests */
employeeRouter.get("/", findAllEmployees);
employeeRouter.get("/:id", findEmployee);

/* POST requests  */

/* PUT requests  */
employeeRouter.put("/:id", updateEmployee);

/* DELETE requests */
employeeRouter.delete("/:id", deleteEmployee);

export default employeeRouter;
