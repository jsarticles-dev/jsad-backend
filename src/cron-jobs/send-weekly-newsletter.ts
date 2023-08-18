import { CronJob } from "cron";
import { findNewsletterToBeSent } from "../model/newsletter";
import { INewsletter, IUser } from "../types/general";
import { findUsers } from "../model/user";
import sgMail from "../configs/mailProvider";
import logger from "../configs/logger";

const sendNewsletter = async () => {
  const newsletter: INewsletter | null = await findNewsletterToBeSent();

  if (!newsletter) {
    return null;
  }

  const users: IUser[] | [] = await findUsers([]);

  if (users.length === 0) {
    return null;
  }

  const msg = {
    personalizations: users.map((user) => {
      return {
        to: [
          {
            email: user.email,
          },
        ],
      };
    }),
    from: "hello@jsarticles.dev",
    subject: newsletter.header,
    html: newsletter.content,
  };

  //! You may not include more than 1000 personalizations per API request.
  //! If you need to include more than 1000 personalizations
  //! please divide these across multiple API requests.

  try {
    await sgMail.send(msg);
    logger.info(`Newsletter ${newsletter._id} sent`);
  } catch (error) {
    logger.error(error);
  }
};

const newsletterCronJob: CronJob = new CronJob(
  "55 13 * * *",
  sendNewsletter,
  null,
  false,
  "Europe/Istanbul"
);

export default newsletterCronJob;
