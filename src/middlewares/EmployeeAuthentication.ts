import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { EMPLOYEE_ROLES } from "../constants/generalConstants";

interface IEmployeeAuthentication {
  role: EMPLOYEE_ROLES;
  id: string;
}

export default function isEmployeeAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ errorMessage: "Token was not provided!" });
  }

  const decodedToken = jwt.verify(
    token,
    `${process.env.JWT_SECRET}`
  ) as IEmployeeAuthentication;

  if (decodedToken.id && decodedToken.role) {
    res.locals.employee = {
      id: decodedToken.id,
      role: decodedToken.role as EMPLOYEE_ROLES,
    };
    next();
  } else {
    res.redirect("/login");
  }
}
