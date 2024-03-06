import { Request, Response } from 'express';
import { TLoginService, TRegistrationService } from '../types/TRegistrationService';

const isNullOrUndefined = <T extends string | null | undefined>(data: T): boolean => data === null || data === undefined;
const errorHandler = (message: string, res: Response) => () =>
  res.status(400).json({ message: message });



export const RegistrationService = (dependencies: TRegistrationService) => async (req: Request, res: Response) => {
  const handleRegistrationSuccess = async (emailAndPassword: { email: string, password: string }) => {
    const { email, password } = emailAndPassword;
    const { hash, salt } = dependencies.encryptPasswordRegistration(password);
    try {
      const { status, message } = await dependencies.createUser({ hash: hash, salt: salt, email: email });
      if (status === "success")
        return res.status(201).json({ message: "Registration successful" });
      if(status==="error" && message.includes("dupilcate account error"))
        return res.status(409).json({ message: "dupilcate account error" });
    } catch (err: any) {
      console.log(err)
      if(err?.status.includes('DUPLICATE_ACCOUNT')){
         return res.status(409).json(err)
      }
         return res.status(409).json({status:"error", message:"Internal Server Error"})

      // return err.code === 11000 ?
        // res.status(409).json({ message: err.message }) :
        // res.status(500).json({ message: "Internal Registration Server Error" });
    }
  }
  const password: string | null | undefined = req.body?.password?.toString();
  const email: string | null | undefined = req.body?.email?.toString();
  (isNullOrUndefined(req.body) || isNullOrUndefined(email) && isNullOrUndefined(password)) ?
    errorHandler("Email and password are required", res)() :
    isNullOrUndefined(password) ?
      errorHandler("Password is required", res)() :
      isNullOrUndefined(email) ?
        errorHandler("Email is required", res)() :
        await handleRegistrationSuccess({ email: email as string, password: password as string });

};
export const LogoutService = (dependencies: any) => async (req: Request, res: Response) => {
  const handleLogout = async () => {
    res.send({ "asd": "asd" });
  }
  handleLogout()
}

export const LoginService = (dependencies: TLoginService) => async (req: Request, res: Response) => {
  const handleLogin = async (emailAndPassword: { email: string, password: string }) => {
    const { email, password } = emailAndPassword;
    try {
      const userHashSalt = await dependencies.getUserByEmail(email)
      if (userHashSalt.message.includes("USER_NOT_FOUND")) {
        return res.status(400).json({ message: "User does not exist." })
      }
      if (userHashSalt.message.includes("USER_FOUND")) {
        const { id, salt, hash } = userHashSalt.userDetail;
        const isValidUserPassword = dependencies.validPassword(password, hash, salt);
        if (!Boolean(isValidUserPassword)) {
          return res.status(400).json({ message: "invalid password" })
        }
        if (Boolean(isValidUserPassword)) {
          const signToken = dependencies.jwtSign({ id: id, email: email });

          // res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
          // res.header('Access-Control-Allow-Origin', 'https://heron-witty-snake.ngrok-free.app'); // Replace with your client's origin
          // res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
          // res.header('Access-Control-Allow-Credentials', 'true');
          res.cookie("token", signToken.token, { httpOnly: true, maxAge: 3600000 })
          return res.status(200).json({
            message: "Login successful",
            token: signToken
          })
        }
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({message:"Login fail"})
    }
    // return isValidUser?
    // res.status(200).json({email, salt,hash})

  }

  const password: string | null | undefined = req.body?.password?.toString();
  const email: string | null | undefined = req.body?.email?.toString();
  (isNullOrUndefined(req.body) || isNullOrUndefined(email) && isNullOrUndefined(password)) ?
    errorHandler("Email and password are required", res)() :
    isNullOrUndefined(password) ?
      errorHandler("Password is required", res)() :
      isNullOrUndefined(email) ?
        errorHandler("Email is required", res)() :
        await handleLogin({ email: email as string, password: password as string });


}
