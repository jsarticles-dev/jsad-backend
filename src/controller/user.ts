import { Request, Response } from "express";

const addUser = (req: Request, res: Response) => {
  console.log(req);
  console.log(res);
};

export { addUser };
