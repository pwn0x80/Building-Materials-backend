"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_container_1 = require("../containers/order.container");
const jwtService_1 = require("../utils/jwtService");
const router = (0, express_1.Router)();
const isCartEmpty = (req, res, next) => {
    console.log("cart middleware", req.user);
    if (req.user.cartId.products.length <= 0)
        res.redirect("/cart");
    next();
};
router.post("/placeOrder", jwtService_1.jwtVerify, isCartEmpty, order_container_1.placeOrderService);
router.get("/getUserOrder", jwtService_1.jwtVerify, order_container_1.getUserPendingOrdersService);
router.post("/cancelOrder", jwtService_1.jwtVerify, order_container_1.cancelOrderService);
exports.default = router;
//# sourceMappingURL=order.route.js.map