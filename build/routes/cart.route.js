"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_container_1 = require("../containers/cart.container");
const jwtService_1 = require("../utils/jwtService");
const router = (0, express_1.Router)();
router.post("/addProduct", jwtService_1.jwtVerify, cart_container_1.addProductToCartService);
router.post("/removeProduct", jwtService_1.jwtVerify, cart_container_1.removeProductFromCartService);
router.get("/getAllProduct", jwtService_1.jwtVerify, cart_container_1.getAllProductFromCartService);
router.post("/updateQuantity", jwtService_1.jwtVerify, cart_container_1.updateProductQtyService);
exports.default = router;
//# sourceMappingURL=cart.route.js.map