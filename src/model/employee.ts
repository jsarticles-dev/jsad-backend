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

const findEmployeeById = async (id: string) => {
  return await EmployeeModel.findById(new Types.ObjectId(id));
};

const findEmployees = async (ids: string[]) => {
  if (ids && ids.length > 0) {
    return await EmployeeModel.find({
      _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
    });
  }

  return await EmployeeModel.find();
};

const findEmployeeByEmail = async (email: string) => {
  return await EmployeeModel.findOne({ email });
};

const updateEmployeeById = async (
  id: string,
  fields: { name: string; password: string; role: string; email: string }
) => {
  return await EmployeeModel.findByIdAndUpdate(new Types.ObjectId(id), fields);
};

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
