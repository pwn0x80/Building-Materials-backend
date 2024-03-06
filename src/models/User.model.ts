import mongoose, { Types, Document } from 'mongoose';
import { IUserModel } from '../types/user';
export enum UserRoles {
  ADMIN = "admin",
  MEMBER = "member",
  DEVELOPER = "developer",
}
const UserSchema = new mongoose.Schema<IUserModel>({
  email: {
    type: String,
    unique: true,

  },
  role: {
    type: String,
    enum: ["ADMIN", "MEMBER", "DEVELOPER"],
    default: "MEMBER"
  },
  hash: String,
  salt: String,
  cartId: { type: mongoose.Schema.ObjectId, ref: "Cart" }
});


const User = mongoose.model('User', UserSchema);

export default User;
