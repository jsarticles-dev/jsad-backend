import mongoose from "mongoose";
import { EMPLOYEE_ROLES } from "../constants/generalConstants";
const { Schema, Types } = mongoose;

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [EMPLOYEE_ROLES.ADMIN, EMPLOYEE_ROLES.EDITOR],
    required: true,
  },
});

const EmployeeModel = mongoose.model("Employee", EmployeeSchema);
/**
 * This function is used to add new employee.
 * @param {object} - The object that contains the employee information.
 * @returns
 */
const addNewEmoloyee = async ({
  name,
  password,
  role,
  email,
}: {
  name: string;
  password: string;
  role: string;
  email: string;
}) => {
  return await EmployeeModel.create({ name, password, role, email });
};

/**
 * This function is used to find employee by id.
 * @param {string} id - The id of the employee.
 */
const findEmployeeById = async (id: string) => {
  return await EmployeeModel.findById(new Types.ObjectId(id));
};

/**
 * This function is used to find employees by id.
 * @param {string[]} ids - The ids of the employees.
 * @returns - The employees that are found.
 */
const findEmployees = async (ids: string[]) => {
  if (ids && ids.length > 0) {
    return await EmployeeModel.find({
      _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
    });
  }

  return await EmployeeModel.find();
};

/**
 * This function is used to find employee by email.
 * @param {string} email - The email of the employee.
 * @returns - The employee that is found.
 */
const findEmployeeByEmail = async (email: string) => {
  return await EmployeeModel.findOne({ email });
};

/**
 * This function is used to update employee by id.
 * @param {string} id - The id of the employee.
 * @param {object} fields - The fields that need to be updated.
 * @returns - The updated employee.
 */
const updateEmployeeById = async (
  id: string,
  fields: { name: string; password: string; role: string; email: string }
) => {
  return await EmployeeModel.findByIdAndUpdate(new Types.ObjectId(id), fields);
};

/**
 * This function is used to delete employee by id.
 * @param {string} id - The employee's id.
 * @returns - The deleted employee.
 */
const deleteEmployeeById = async (id: string) => {
  return await EmployeeModel.findByIdAndDelete(new Types.ObjectId(id));
};

export {
  addNewEmoloyee,
  findEmployeeById,
  findEmployees,
  updateEmployeeById,
  deleteEmployeeById,
  findEmployeeByEmail,
};
