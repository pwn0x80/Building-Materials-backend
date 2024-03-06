import { TUser } from "./user";
declare global {
  namespace Express {
    export interface Request {
      user?: TUser| null |undefined;
    }
  }
}

export {};
