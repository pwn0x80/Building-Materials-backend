import {Router } from "express";
import { categoryService } from "../containers/category.container";
const router = Router();

router.get("/getAllCategory", categoryService)


export default router
