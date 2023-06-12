import { Request, Response } from "express";
import {
  createUser,
  deleteUserById,
  findUserByEmail,
  findUserById,
  findUsers,
} from "../model/user";

const addUser = async (req: Request, res: Response) => {
  const { email, gdprInfo } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const createdUser = await createUser(email, gdprInfo);

  if (createdUser) {
    return res.status(200).json({
      message: "User created successfully",
    });
  }

  return res.status(400).json({ message: "User creation failed" });
};

const findUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json(null);
  }

  const user = await findUserById(id);

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  return res.status(200).json(user);
};

const findAllUsers = async (req: Request, res: Response) => {
  const { ids } = req.body;

  const users = await findUsers(ids);
  return res.status(200).json(users);
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json(null);
  }

  await deleteUserById(id);

  return res.sendStatus(200);
};

export { addUser, findUser, findAllUsers, deleteUser };
