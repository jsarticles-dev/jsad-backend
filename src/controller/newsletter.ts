import {
  addNewNewsletter,
  deleteNewsletterById,
  findNewsletterById,
  findNewslettersByIds,
  updateNewsletterById,
} from "../model/newsletter";
import { Request, Response } from "express";

const createNewNewsletter = async (req: Request, res: Response) => {
  const { content, dateOfDispatch, header } = req.body;

  if (!content || !dateOfDispatch || !header) {
    return res
      .status(400)
      .json({ errorMessage: "Some required fields are missing!" });
  }

  try {
    const newNewsletter = await addNewNewsletter(
      content,
      dateOfDispatch,
      header
    );
    return res.status(200).json(newNewsletter);
  } catch (error) {
    console.log(error);
    return res.status(400).json(null);
  }
};

const updateNewsletter = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isSent, header, content, dateOfDispatch } = req.body;

  if (!id) {
    return res.status(400).json({ errorMessage: "ID is missing!" });
  }

  if (!isSent && !header && !content && !dateOfDispatch) {
    return res
      .status(400)
      .json({ errorMessage: "You should provide at least 1 field!" });
  }

  try {
    const updatedNewsLetter = await updateNewsletterById(id, {
      content,
      dateOfDispatch,
      header,
    });
    return res.status(200).json(updatedNewsLetter);
  } catch (error) {
    return res.status(500).json({ errorMessage: "Something went wrong!" });
  }
};

const deleteNewsletter = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ errorMessage: "ID is missing!" });
  }
  try {
    await deleteNewsletterById(id);
    return true;
  } catch (error) {
    return res.status(500).json({ errorMessage: "Something went wrong!" });
  }
};

const findNewsletter = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ errorMessage: "ID is missing!" });
  }

  try {
    const newsletter = await findNewsletterById(id);

    if (!newsletter) {
      return res.status(404);
    }

    return res.status(200).json(newsletter);
  } catch (error) {
    return res.status(500).json({ errorMessage: "Something went wrong!" });
  }
};

const findNewsLetters = async (req: Request, res: Response) => {
  const { ids } = req.body;

  try {
    let newsletters = [];
    if (!ids || ids.length === 0) {
      newsletters = await findNewslettersByIds([]);
    } else {
      newsletters = await findNewslettersByIds(ids);
    }

    return res.status(200).json(newsletters);
  } catch (error) {
    return res.status(500).json({ errorMessage: "Something went wrong!" });
  }
};

export {
  findNewsLetters,
  createNewNewsletter,
  updateNewsletter,
  deleteNewsletter,
  findNewsletter,
};
