import mongoose from "mongoose";
import { IUser } from "../types/general";
const { Schema, model, Types } = mongoose;

const UserSchema = new Schema(
  {
    email: String,
    sentNewsletters: {
      type: [Schema.Types.ObjectId],
      ref: "Newsletter",
      default: [],
    },
  },
  { timestamps: true }
);

const UserModel = model<IUser>("User", UserSchema);

/**
 * This function creates a new user.
 * @param {string} email - Email of the user.
 * @param {object} gdprInfo - Information about GDPR.
 * @returns - The created user.
 */
const createUser = async (email: string): Promise<IUser> => {
  const user = await UserModel.create({ email });
  return user;
};

/**
 * This function deletes a user by id.
 * @param {string} id - Id of the user.
 * @returns - The deleted user.
 */
const deleteUserById = async (id: string): Promise<IUser | null> => {
  return await UserModel.findByIdAndDelete(new Types.ObjectId(id));
};

/**
 * This function finds a user by id.
 * @param {string} id - Id of the user.
 * @returns - The found user.
 */
const findUserById = async (id: string): Promise<IUser | null> => {
  return await UserModel.findById(new Types.ObjectId(id));
};

/**
 * It finds users by ids. If ids is empty, it finds all users.
 * @param {string[]} ids - Array of user ids
 */
const findUsers = async (ids: string[]): Promise<IUser[]> => {
  if (ids && ids.length > 0) {
    return await UserModel.find({
      _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
    });
  }

  return await UserModel.find();
};

/**
 * It finds users who have not sent newsletter today.
 * @param {Types.ObjectId} idOfNewsLetter - Id of newsletter.
 * */
const findUsersWithoutEmailToday = async (
  idOfNewsLetter: mongoose.Types.ObjectId
) => {
  return await UserModel.find({
    sentNewsletters: { $nin: [idOfNewsLetter] },
  });
};

/**
 * This function finds a user by email.
 * @param {string} email - Email of the user.
 * @returns - The found user.
 * */
const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await UserModel.findOne({ email });
};

export {
  createUser,
  deleteUserById,
  findUserById,
  findUsers,
  findUsersWithoutEmailToday,
  UserModel,
  findUserByEmail,
};
