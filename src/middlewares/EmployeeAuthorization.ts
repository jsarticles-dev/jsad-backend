import { EMPLOYEE_ROLES } from "../constants/generalConstants";
import { ISessionDataEmployee } from "./../types/express-session/index.d";
import { NextFunction, Request, Response } from "express";

export default function authorizationMiddleware(
  requiredRoles: EMPLOYEE_ROLES[]
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const employee = (req.session as ISessionDataEmployee).employee;

    if (requiredRoles.includes(employee.role as EMPLOYEE_ROLES)) {
      next();
    } else {
      res.status(403).send("Unauthorized");
    }
  };
}
