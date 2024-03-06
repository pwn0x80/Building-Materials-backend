import { Router } from "express";
import { adminVerify } from "../utils/jwtService";
import { addNewLocationService } from "../containers/location.container";

const router = Router();

router.post("/addLocation",adminVerify, addNewLocationService)

export default router;
