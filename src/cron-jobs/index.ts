import logger from "../configs/logger";
import newsletterCronJob from "./send-weekly-newsletter";

const startCronJobs = () => {
  logger.info("Cron Jobs triggered");
  newsletterCronJob.start();
};

const stopCronJobs = () => {
  newsletterCronJob.stop();
};

export default { startCronJobs, stopCronJobs };
