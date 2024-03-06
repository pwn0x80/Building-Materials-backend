"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productImage_middleware_1 = require("../middleware/diskStorage/productImage.middleware");
const admin_container_1 = require("../containers/admin.container");
const router = (0, express_1.Router)();
router.post('/addProduct', productImage_middleware_1.uploadProductImage, admin_container_1.addProductService);
router.post('/addCategory', admin_container_1.addCategoryService);
exports.default = router;
//# sourceMappingURL=admin.route.js.map