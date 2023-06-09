import express, { Router, Request, Response } from "express";

const userRouter: Router = express.Router();

userRouter.get("/", (req: Request, res: Response) => {
  //const { body } = req;
  res.send("Selamm");
});

export default userRouter;
