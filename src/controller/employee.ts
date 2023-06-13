import { Request, Response } from "express";
import {
  addNewEmoloyee,
  deleteEmployeeById,
  findEmployeeByEmail,
  findEmployeeById,
  findEmployees,
  updateEmployeeById,
} from "../model/employee";
import bcrypt from "bcrypt";
import { ISessionDataEmployee } from "../types/express-session/index";

const findEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json(null);
  }

  const employee = await findEmployeeById(id);

  if (!employee) {
    return res.status(400).json("Employee not found");
  }
  return res.status(200).json(employee);
};

const findAllEmployees = async (req: Request, res: Response) => {
  const { ids } = req.body;
  const employees = await findEmployees(ids);

  return res.status(200).json(employees);
};

const updateEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  if (!id) {
    return res.status(400).json(null);
  }

  const employee = await findEmployeeById(id);
  if (!employee) {
    return res.status(400).json("Employee not found");
  }

  try {
    await updateEmployeeById(id, { name, email, password, role });
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const deleteEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json(null);
  }

  try {
    await deleteEmployeeById(id);
    return res.sendStatus(200);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const loginAsEmployee = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const employee = await findEmployeeByEmail(email);
  if (!employee) {
    return res.status(400).json("Employee not found");
  }

  const isPasswordValid = await bcrypt.compare(password, employee.password);

  if (!isPasswordValid) {
    return res.status(400).json("Invalid password");
  }

  (req.session as ISessionDataEmployee).employee = {
    id: employee.id,
    role: employee.role,
  };

  return res.status(200).json(employee);
};

const registerAsEmployee = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  const employee = await findEmployeeByEmail(email);

  if (employee) {
    return res.status(400).json("Employee already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newEmployee = await addNewEmoloyee({
      name,
      email,
      password: hashedPassword,
      role,
    });
    return res.status(200).json(newEmployee);
  } catch (error) {
    return res.status(400).json(error);
  }
};
export {
  registerAsEmployee,
  findAllEmployees,
  deleteEmployee,
  findEmployee,
  updateEmployee,
  loginAsEmployee,
};
