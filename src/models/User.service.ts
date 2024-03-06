import { MongooseError } from "mongoose"
import User from "./User.model"
import {Cart} from "./Cart.model"
import { IUserModel } from "../types/user"




export const createUser = async (userDetail: IUserModel)=> {

  try {
    const newCart = new Cart()
    const userModel = new User({
      email: userDetail.email,
      salt: userDetail.salt,
      hash: userDetail.hash,
      cartId: newCart._id
    })
    await Promise.all([userModel.save(), newCart.save()]);
    return {status:"success", message:"New User created."}
  } catch (error: any) {
    //11000 Duplicate account error
    if (error.code == 11000) {
    throw {status:"DUPLICATE_ACCOUNT", message:"duplicate account error"}
    }
    throw {status:"error", message:"internal error"}
  }
}

export async function getUserByEmail(email: string) {
  try {
    let userDetail = await User.findOne({ email },"hash salt");
    if(userDetail){
      return {status: "success", message:"USER_FOUND", userDetail:userDetail}
    } else{
      return {status:"error",message:"USER_NOT_FOUND"}
    }
  } catch (error: any) {
    console.log(error)
    throw {status:"error", message:`Error getting user by username: ${error.message}`}
  }
}
