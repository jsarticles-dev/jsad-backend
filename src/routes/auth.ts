import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
const authRouter: Router = express.Router();

/* GET Requests */
authRouter.get("/isValid", async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ isTokenValid: false });
  }
  try {
    jwt.verify(token, `${process.env.JWT_SECRET}`);
    return res.json({ isTokenValid: true });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ isTokenValid: false });
  }
});

export default authRouter;
