import {userModelType} from "./database";
import {IUserModel} from "./user"
export type TRegistrationService = {
  encryptPasswordRegistration: (password: string) => { hash: string, salt: string },
  createUser: (IUserModel) => Promise<{ status:string,message:string }>
};

type TUserData =  IUserModel & {id:string}
export type TLoginService = {
  getUserByEmail : (email:string)=>Promise<{message:string, userDetail?:any, status:string}>,
  validPassword: (password:string,hash:string,salt:string)=>Boolean,
  jwtSign:({id:string,email:string})=>{token:string}
}
