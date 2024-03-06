
import { Router } from "express";
const router = Router()
import {loginService, logoutService, registrationService} from "../containers/auth.container";

router.post('/register',registrationService);
router.post('/login',loginService);
router.post("/logout", logoutService)



export default router

