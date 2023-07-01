import express, { Router } from "express";
import isEmployeeAuthenticated from "../middlewares/EmployeeAuthentication";
import {
  createNewNewsletter,
  deleteNewsletter,
  findNewsLetters,
  findNewsletter,
  updateNewsletter,
} from "../controller/newsletter";

const newsletterRouter: Router = express.Router();

/* GET Requests */
newsletterRouter.get("/", isEmployeeAuthenticated, findNewsLetters);
newsletterRouter.get("/:id", isEmployeeAuthenticated, findNewsletter);

/* POST Requests */
newsletterRouter.post("/", isEmployeeAuthenticated, createNewNewsletter);

/* PUT Requests*/
newsletterRouter.put("/:id", isEmployeeAuthenticated, updateNewsletter);

/* DELETE Requests*/
newsletterRouter.delete("/:id", isEmployeeAuthenticated, deleteNewsletter);

export default newsletterRouter;
