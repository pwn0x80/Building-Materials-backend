"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutService = exports.loginService = exports.registrationService = void 0;
const auth_controller_1 = require("../controllers/auth.controller");
const User_service_1 = require("../models/User.service");
const jwtService_1 = require("../utils/jwtService");
const registrationServiceObj = {
    encryptPasswordRegistration: jwtService_1.encryptPasswordRegistration, createUser: User_service_1.createUser,
};
const registrationService = (0, auth_controller_1.RegistrationService)(registrationServiceObj);
exports.registrationService = registrationService;
const loginServiceObj = {
    getUserByEmail: User_service_1.getUserByEmail,
    validPassword: jwtService_1.validPassword,
    jwtSign: jwtService_1.jwtSign
};
const loginService = (0, auth_controller_1.LoginService)(loginServiceObj);
exports.loginService = loginService;
const logoutService = (0, auth_controller_1.LogoutService)({});
exports.logoutService = logoutService;
//# sourceMappingURL=auth.container.js.map