"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const category_controller_1 = require("../controllers/category.controller");
const Category_service_1 = require("../models/Category.service");
const categoryServiceObj = {
    getAllCategory: Category_service_1.getAllCategory
};
const categoryService = (0, category_controller_1.CategoryService)(categoryServiceObj);
exports.categoryService = categoryService;
//# sourceMappingURL=category.container.js.map