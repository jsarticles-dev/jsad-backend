import mongoose from "mongoose";

const { Schema, model } = mongoose;

const GDPRSchema = new Schema({
  isAccepted: { type: Boolean, required: true },
  ip: String,
});
const UserSchema = new Schema({
  email: String,
  gdprInfo: GDPRSchema,
});

const UserModel = model("User", UserSchema);

export { UserModel };
