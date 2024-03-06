import { Router } from "express";
import { addProductToCartService, getAllProductFromCartService, removeProductFromCartService, updateProductQtyService } from "../containers/cart.container";
import { jwtVerify } from "../utils/jwtService";
const router = Router()
router.post("/addProduct", jwtVerify, addProductToCartService);
router.post("/removeProduct", jwtVerify, removeProductFromCartService);
router.get("/getAllProduct", jwtVerify, getAllProductFromCartService);
router.post("/updateQuantity", jwtVerify, updateProductQtyService)

export default router
