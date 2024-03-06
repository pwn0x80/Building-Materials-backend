import { Router } from "express";
import { 
productByIdService,productByNameService, getProductByCategoryService, getProductWithOptionsService, searchProductsService 
} from "../containers/products.container";

import { defaults } from "axios";
const router = Router();

router.get("/getProductById", productByIdService)
router.get("/getProductByName",productByNameService)
router.get("/getProductBycategory",getProductByCategoryService)
router.get("/getProductWithOptions",getProductWithOptionsService)
router.get("/searchProducts",searchProductsService)

export default router
