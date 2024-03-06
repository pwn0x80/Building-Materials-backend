"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = exports.LogoutService = exports.RegistrationService = void 0;
const isNullOrUndefined = (data) => data === null || data === undefined;
const errorHandler = (message, res) => () => res.status(400).json({ message: message });
const RegistrationService = (dependencies) => async (req, res) => {
    const handleRegistrationSuccess = async (emailAndPassword) => {
        const { email, password } = emailAndPassword;
        const { hash, salt } = dependencies.encryptPasswordRegistration(password);
        try {
            const { status, message } = await dependencies.createUser({ hash: hash, salt: salt, email: email });
            if (status === "success")
                return res.status(201).json({ message: "Registration successful" });
            if (status === "error" && message.includes("dupilcate account error"))
                return res.status(409).json({ message: "dupilcate account error" });
        }
        catch (err) {
            console.log(err);
            if (err?.status.includes('DUPLICATE_ACCOUNT')) {
                return res.status(409).json(err);
            }
            return res.status(409).json({ status: "error", message: "Internal Server Error" });
            // return err.code === 11000 ?
            // res.status(409).json({ message: err.message }) :
            // res.status(500).json({ message: "Internal Registration Server Error" });
        }
    };
    const password = req.body?.password?.toString();
    const email = req.body?.email?.toString();
    (isNullOrUndefined(req.body) || isNullOrUndefined(email) && isNullOrUndefined(password)) ?
        errorHandler("Email and password are required", res)() :
        isNullOrUndefined(password) ?
            errorHandler("Password is required", res)() :
            isNullOrUndefined(email) ?
                errorHandler("Email is required", res)() :
                await handleRegistrationSuccess({ email: email, password: password });
};
exports.RegistrationService = RegistrationService;
const LogoutService = (dependencies) => async (req, res) => {
    const handleLogout = async () => {
        res.send({ "asd": "asd" });
    };
    handleLogout();
};
exports.LogoutService = LogoutService;
const LoginService = (dependencies) => async (req, res) => {
    const handleLogin = async (emailAndPassword) => {
        const { email, password } = emailAndPassword;
        try {
            const userHashSalt = await dependencies.getUserByEmail(email);
            if (userHashSalt.message.includes("USER_NOT_FOUND")) {
                return res.status(400).json({ message: "User does not exist." });
            }
            if (userHashSalt.message.includes("USER_FOUND")) {
                const { id, salt, hash } = userHashSalt.userDetail;
                const isValidUserPassword = dependencies.validPassword(password, hash, salt);
                if (!Boolean(isValidUserPassword)) {
                    return res.status(400).json({ message: "invalid password" });
                }
                if (Boolean(isValidUserPassword)) {
                    const signToken = dependencies.jwtSign({ id: id, email: email });
                    // res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
                    // res.header('Access-Control-Allow-Origin', 'https://heron-witty-snake.ngrok-free.app'); // Replace with your client's origin
                    // res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
                    // res.header('Access-Control-Allow-Credentials', 'true');
                    res.cookie("token", signToken.token, { httpOnly: true, maxAge: 3600000 });
                    return res.status(200).json({
                        message: "Login successful",
                        token: signToken
                    });
                }
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ message: "Login fail" });
        }
        // return isValidUser?
        // res.status(200).json({email, salt,hash})
    };
    const password = req.body?.password?.toString();
    const email = req.body?.email?.toString();
    (isNullOrUndefined(req.body) || isNullOrUndefined(email) && isNullOrUndefined(password)) ?
        errorHandler("Email and password are required", res)() :
        isNullOrUndefined(password) ?
            errorHandler("Password is required", res)() :
            isNullOrUndefined(email) ?
                errorHandler("Email is required", res)() :
                await handleLogin({ email: email, password: password });
};
exports.LoginService = LoginService;
//# sourceMappingURL=auth.controller.js.map