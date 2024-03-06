import { LoginService, LogoutService, RegistrationService } from "../controllers/auth.controller";
import { createUser, getUserByEmail } from "../models/User.service";
import { TLoginService, TRegistrationService } from "../types/TRegistrationService";

import { encryptPasswordRegistration, jwtSign, validPassword } from "../utils/jwtService";

const registrationServiceObj: TRegistrationService = {
  encryptPasswordRegistration, createUser,
};
const registrationService = RegistrationService(registrationServiceObj);

const loginServiceObj: TLoginService = {
  getUserByEmail,
  validPassword,
  jwtSign
}
const loginService = LoginService(loginServiceObj)

const logoutService = LogoutService({});
export { registrationService, loginService, logoutService };
