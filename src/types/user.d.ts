import { Types } from "mongoose";

export interface IUserModel extends Document {
  id?:Types.ObjectId
  email: string;
  hash: string;
  salt: string;
  cartId:Types.ObjectId; 
  role:string;
}
