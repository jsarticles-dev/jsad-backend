import { EMPLOYEE_ROLES } from "../constants/generalConstants";

import { NextFunction, Request, Response } from "express";

export default function authorizationMiddleware(
  requiredRoles: EMPLOYEE_ROLES[]
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { employee } = res.locals;

    if (requiredRoles.includes(employee.role as EMPLOYEE_ROLES)) {
      next();
    } else {
      res.status(403).send("Unauthorized");
    }
  };
}
