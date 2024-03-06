"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const admin_route_1 = __importDefault(require("./admin.route"));
const products_route_1 = __importDefault(require("./products.route"));
const category_route_1 = __importDefault(require("./category.route"));
const cart_route_1 = __importDefault(require("./cart.route"));
const order_route_1 = __importDefault(require("./order.route"));
const location_route_1 = __importDefault(require("./location.route"));
const router = (0, express_1.Router)();
router.use("/auth", auth_route_1.default);
router.use("/admin", admin_route_1.default);
router.use("/product", products_route_1.default);
router.use("/category", category_route_1.default);
router.use("/cart", cart_route_1.default);
router.use("/order", order_route_1.default);
router.use("/location", location_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map