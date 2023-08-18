import { Document } from "mongoose";

interface INewsletter extends Document {
  _id: mongoose.Types.ObjectId;
  header: string;
  content: string;
  number: number;
  dateOfDispatch: Date;
  isSent: boolean;
}

interface IEmployee extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  password: string;
  email: string;
  role: EMPLOYEE_ROLES;
}

interface IGDPRSchema {
  isAccepted: boolean;
  ip: string;
}

interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  gdprInfo: IGDPRSchema;
  sentNewsletters: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export { INewsletter, IEmployee, IUser, IGDPRSchema };
