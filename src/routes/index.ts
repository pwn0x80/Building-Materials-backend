
import { Router } from "express";
import authRoute from "./auth.route";
import adminRoute from "./admin.route";
import productsRoute from "./products.route";
import categoryRoute from "./category.route"
import cartRoute from "./cart.route"
import orderRoute from "./order.route"
import locationRoute from "./location.route"
const router = Router()
router.use("/auth",authRoute);
router.use("/admin",adminRoute)
router.use("/product",productsRoute)
router.use("/category",categoryRoute)
router.use("/cart", cartRoute)
router.use("/order",orderRoute)
router.use("/location",locationRoute)

export default  router;
