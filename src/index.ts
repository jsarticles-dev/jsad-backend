import "dotenv/config";
import logger from "./configs/logger";
import { app } from "./app";
import connectToDB from "./configs/database";

app.listen(process.env.PORT, () => {
  logger.info(`Listening on port ${process.env.PORT}`);
  connectToDB();
});
