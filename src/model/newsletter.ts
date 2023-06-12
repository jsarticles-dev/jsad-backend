import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const NewsletterSchema = new Schema(
  {
    content: { type: String, required: true },
    dateOfDispatch: { type: Date, required: true },
    isSent: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const NewsletterModel = model("Newsletter", NewsletterSchema);

const addNewNewsletter = async (content: string, dateOfDispatch: Date) => {
  return await NewsletterModel.create({ content, dateOfDispatch });
};

const updateNewsletterById = async (
  id: string,
  fields: {
    content?: string;
    dateOfDispatch?: Date;
    isSent?: boolean;
  }
) => {
  return await NewsletterModel.findByIdAndUpdate(
    new Types.ObjectId(id),
    fields
  );
};

const deleteNewsletterById = async (id: string) => {
  return await NewsletterModel.findByIdAndDelete(new Types.ObjectId(id));
};

const findNewsletterById = async (id: string) => {
  return await NewsletterModel.findById(new Types.ObjectId(id));
};

const findNewsletters = async (ids: string[]) => {
  if (ids.length > 0) {
    return await NewsletterModel.find({
      _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
    });
  }

  return await NewsletterModel.find();
};

/**
 * This function will return newsletter that are not sent yet and are due to be sent today. */
const findNewsletterToBeSent = async () => {
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
  findNewsletters,
  NewsletterModel,
};
