import mongoose, { Document } from "mongoose";
import { EMPLOYEE_ROLES } from "../constants/generalConstants";
const { Schema, Types } = mongoose;

interface IEmployee extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  password: string;
  email: string;
  role: EMPLOYEE_ROLES;
}

const EmployeeSchema = new Schema<IEmployee>({
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

const EmployeeModel = mongoose.model<IEmployee>("Employee", EmployeeSchema);
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
}): Promise<IEmployee> => {
  return await EmployeeModel.create({ name, password, role, email });
};

/**
 * This function is used to find employee by id.
 * @param {string} id - The id of the employee.
 */
const findEmployeeById = async (id: string): Promise<IEmployee | null> => {
  return await EmployeeModel.findById(new Types.ObjectId(id));
};

/**
 * This function is used to find employees by id.
 * @param {string[]} ids - The ids of the employees.
 * @returns - The employees that are found.
 */
const findEmployees = async (ids?: string[]): Promise<IEmployee[]> => {
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
const findEmployeeByEmail = async (
  email: string
): Promise<IEmployee | null> => {
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
  fields: { name?: string; password?: string; role?: string; email?: string }
): Promise<IEmployee | null> => {
  return await EmployeeModel.findByIdAndUpdate(new Types.ObjectId(id), fields, {
    returnOriginal: false,
  });
};

/**
 * This function is used to delete employee by id.
 * @param {string} id - The employee's id.
 * @returns - The deleted employee.
 */
const deleteEmployeeById = async (id: string): Promise<IEmployee | null> => {
  return await EmployeeModel.findByIdAndDelete(new Types.ObjectId(id));
};

export {
  addNewEmoloyee,
  findEmployeeById,
  findEmployees,
  updateEmployeeById,
  deleteEmployeeById,
  findEmployeeByEmail,
  EmployeeModel,
};
