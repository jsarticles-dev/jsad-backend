import { Session } from "express-session";
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export interface ISessionDataEmployee extends Session {
  employee: { [key: string]: string };
}
