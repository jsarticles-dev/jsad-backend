import { Request, Response } from "express";
import {
  deleteEmployeeById,
  findEmployeeById,
  findEmployees,
  updateEmployeeById,
} from "../model/employee";

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

export { findAllEmployees, deleteEmployee, findEmployee, updateEmployee };
