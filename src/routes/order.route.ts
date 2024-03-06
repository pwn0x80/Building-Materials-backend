import { Router,Request,Response } from "express";
import { cancelOrderService, getUserPendingOrdersService, placeOrderService } from "../containers/order.container";
import { jwtVerify } from "../utils/jwtService";
const router = Router();

const isCartEmpty = (req:Request,res:Response,next:any)=>{
  console.log("cart middleware" ,req.user)
  if(req.user.cartId.products.length<=0) res.redirect("/cart");
  next()
}

router.post("/placeOrder", jwtVerify, isCartEmpty, placeOrderService);
router.get("/getUserOrder", jwtVerify, getUserPendingOrdersService);
router.post("/cancelOrder", jwtVerify, cancelOrderService);

export default router
