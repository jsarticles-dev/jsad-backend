import mongoose from "mongoose";
import { INewsletter } from "../types/general";
const { Schema, model, Types } = mongoose;

const NewsletterSchema = new Schema<INewsletter>(
  {
    header: { type: String, required: true },
    content: { type: String, required: true },
    number: { type: Number, default: 0 },
    dateOfDispatch: { type: Date, required: true },
    isSent: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const NewsletterModel = model<INewsletter>("Newsletter", NewsletterSchema);

/**
 * This function will add a new newsletter to the database.
 * @param {string}content - The content of the newsletter.
 * @param {Date} dateOfDispatch - The date of dispatch of the newsletter.
 * @param {string} header - The header of the newsletter.
 * @param {number} number - The number of the newsletter
 * @returns - The newly created newsletter.
 */
const addNewNewsletter = async ({
  content,
  dateOfDispatch,
  header,
  number,
}: {
  content: string;
  dateOfDispatch: Date;
  header: string;
  number: number;
}): Promise<INewsletter> => {
  return await NewsletterModel.create({
    content,
    dateOfDispatch,
    header,
    number,
  });
};

/**
 * This function will update a newsletter by id.
 * @param {string} id - The id of the newsletter.
 * @param {Object} fields - The fields to update.
 * @returns - The updated newsletter.
 */
const updateNewsletterById = async (
  id: string,
  fields: {
    content?: string;
    dateOfDispatch?: Date;
    header?: string;
    isSent?: boolean;
  }
): Promise<INewsletter | null> => {
  return await NewsletterModel.findByIdAndUpdate(
    new Types.ObjectId(id),
    fields,
    {
      returnOriginal: false,
    }
  );
};

/**
 * This function will delete a newsletter by id.
 * @param {string} id - The id of the newsletter.
 * @returns - The deleted newsletter.
 */
const deleteNewsletterById = async (
  id: string
): Promise<INewsletter | null> => {
  return await NewsletterModel.findByIdAndDelete(new Types.ObjectId(id));
};

/**
 * This function will find a newsletter by id.
 * @param {string} id - The id of the newsletter.
 * @returns - The newsletter with the given id.
 */
const findNewsletterById = async (id: string): Promise<INewsletter | null> => {
  return await NewsletterModel.findById(new Types.ObjectId(id));
};

/**
 * This function will find newsletters by their ids.
 * @param {string[]} ids - The ids of the newsletters.
 * @returns - The newsletters with the given ids.
 */
const findNewslettersByIds = async (ids: string[]): Promise<INewsletter[]> => {
  if (ids.length > 0) {
    return await NewsletterModel.find({
      _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
    });
  }

  return await NewsletterModel.find();
};

/**
 * This function returns last added newsletters.
 */
const findLastAddedNewsletter = async (): Promise<INewsletter | null> => {
  return await NewsletterModel.findOne({}).sort({ _id: -1 });
};

/**
 * This function will return newsletter that are not sent yet and are due to be sent today.
 *  */
const findNewsletterToBeSent = async (): Promise<INewsletter | null> => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return await NewsletterModel.findOne({
    $and: [
      { isSent: false },
      { dateOfDispatch: { $gte: today, $lt: tomorrow } },
    ],
  });
};

export {
  findNewsletterToBeSent,
  findNewsletterById,
  updateNewsletterById,
  addNewNewsletter,
  deleteNewsletterById,
  findNewslettersByIds,
  NewsletterModel,
  findLastAddedNewsletter,
};
