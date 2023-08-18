import { ENVIRONMENTS } from "../constants/environmentConstants";
import mongoose from "mongoose";
import logger from "./logger";

const getConnectionString = () => {
  const DB_DOMAIN: string = process.env.DB_DOMAIN as string;
  const DB_PORT: string = process.env.DB_PORT as string;
  const DB_NAME: string = process.env.DB_NAME as string;

  if (process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT) {
    return `mongodb://${DB_DOMAIN}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority`;
  }
  if (process.env.NODE_ENV === ENVIRONMENTS.TEST) {
    return `mongodb://${DB_DOMAIN}:${DB_PORT}`;
  }
  return "";
};

const connectToDB = async () => {
  const CONNECTION_STRING = getConnectionString();
  try {
    await mongoose.connect(CONNECTION_STRING);
    logger.info("Connected to DB");
  } catch (error) {
    logger.error(error);
  }
};

export default connectToDB;
export { getConnectionString };
