import { ISessionDataEmployee } from "./../types/express-session/index.d";
import { NextFunction, Request, Response } from "express";

export default function isEmployeeAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const employee = (req.session as ISessionDataEmployee).employee;

  if (employee && employee.id) {
    next();
  } else {
    res.redirect("/login");
  }
}
