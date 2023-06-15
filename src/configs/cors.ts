import { CorsOptions } from "cors";
import { ENVIRONMENTS } from "../constants/environmentConstants";
import logger from "./logger";

const getCorsOptions = (): CorsOptions => {
  let whitelist: string[] = [];

  if (process.env.NODE_ENV === ENVIRONMENTS.DEVELOPMENT) {
    whitelist = ["http://localhost:3000/"];
  }

  if (process.env.NODE_ENV === ENVIRONMENTS.PRODUCTION) {
    whitelist = ["https://jsartciles.dev/"];
  }

  if (whitelist.length === 0) {
    logger.error("Whitelist cannot be empty!");
    throw new Error("Something went wrong");
  }

  return {
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };
};

export default getCorsOptions;
