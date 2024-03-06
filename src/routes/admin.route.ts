import { Router } from "express";
import { uploadProductImage } from "../middleware/diskStorage/productImage.middleware";
import { addCategoryService, addProductService } from "../containers/admin.container";
const router = Router();



router.post('/addProduct', uploadProductImage,addProductService)
router.post('/addCategory', addCategoryService)


export default router;
