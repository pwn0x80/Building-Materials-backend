"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_container_1 = require("../containers/products.container");
const router = (0, express_1.Router)();
router.get("/getProductById", products_container_1.productByIdService);
router.get("/getProductByName", products_container_1.productByNameService);
router.get("/getProductBycategory", products_container_1.getProductByCategoryService);
router.get("/getProductWithOptions", products_container_1.getProductWithOptionsService);
router.get("/searchProducts", products_container_1.searchProductsService);
exports.default = router;
//# sourceMappingURL=products.route.js.map