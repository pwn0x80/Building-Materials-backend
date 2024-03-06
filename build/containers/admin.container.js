"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategoryService = exports.addProductService = void 0;
const admin_controller_1 = require("../controllers/admin.controller");
const Product_service_1 = require("../models/Product.service");
const Category_service_1 = require("../models/Category.service");
const addProductServiceObj = {
    addProduct: Product_service_1.addProduct
};
const addProductService = (0, admin_controller_1.AddProductService)(addProductServiceObj);
exports.addProductService = addProductService;
const addCategoryServiceObj = {
    addCategory: Category_service_1.addCategory
};
const addCategoryService = (0, admin_controller_1.AddCategoryService)(addCategoryServiceObj);
exports.addCategoryService = addCategoryService;
//# sourceMappingURL=admin.container.js.map