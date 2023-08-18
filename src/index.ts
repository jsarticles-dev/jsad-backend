import "dotenv/config";
import logger from "./configs/logger";
import { app } from "./app";
import connectToDB from "./configs/database";
import cronJob from "./cron-jobs/index";

app.listen(process.env.PORT, () => {
  logger.info(`Listening on port ${process.env.PORT}`);
  connectToDB();
});

setTimeout(cronJob.startCronJobs, 10000);
