import { Request, Response } from "express";
import {
  createUser,
  deleteUserById,
  findUserByEmail,
  findUserById,
  findUsers,
} from "../model/user";
import logger from "../configs/logger";
import { maskEmail } from "../helpers";

const addUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  const user = await findUserByEmail(email);

  if (user) {
    return res.status(400).json({
      message: "User already exists!",
    });
  }

  const createdUser = await createUser(email);

  if (createdUser._id) {
    logger.info(`User ${maskEmail(email)} created successfully!`);
    return res.status(200).json({
      message: "User created successfully",
    });
  }
  logger.info(`User ${maskEmail(email)} creation failed"`);
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
  try {
    await deleteUserById(id);
    logger.info(`User ${id} deleted successfully!`);
    return res.send({ message: "User deleted successfully" });
  } catch (error) {
    logger.error(`User ${id} deletion failed ${error}`);
    return res.status(400).json({ error: "Something went wrong!" });
  }
};

export { addUser, findUser, findAllUsers, deleteUser };
