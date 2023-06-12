import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const GDPRSchema = new Schema(
  {
    isAccepted: { type: Boolean, required: true },
    ip: String,
  },
  { timestamps: true }
);
const UserSchema = new Schema(
  {
    email: String,
    gdprInfo: GDPRSchema,
    sentNewsletters: {
      type: [Schema.Types.ObjectId],
      ref: "Newsletter",
      default: [],
    },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);

const createUser = async (
  email: string,
  gdprInfo: { isAccepted: boolean; ip: string }
) => {
  return await UserModel.create({ email, gdprInfo });
};

const deleteUserById = async (id: string) => {
  return await UserModel.findByIdAndDelete(new Types.ObjectId(id));
};

const findUserById = async (id: string) => {
  return await UserModel.findById(new Types.ObjectId(id));
};

/**
 * It finds users by ids. If ids is empty, it finds all users.
 * @param {string[]} ids - Array of user ids
 */
const findUsers = async (ids: string[]) => {
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

const findUserByEmail = async (email: string) => {
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
