"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductWithOptionsService = exports.getProductByCategoryService = exports.productByNameService = exports.productByIdService = exports.searchProductsService = void 0;
const products_controller_1 = require("../controllers/products.controller");
const Product_service_1 = require("../models/Product.service");
const getProductByIdServiceObj = {
    getProductById: Product_service_1.getProductById
};
const productByIdService = (0, products_controller_1.GetProductByIdService)(getProductByIdServiceObj);
exports.productByIdService = productByIdService;
const getProductByNameServiceObj = {
    getProductByName: Product_service_1.getProductByName
};
const productByNameService = (0, products_controller_1.GetProductByNameService)(getProductByNameServiceObj);
exports.productByNameService = productByNameService;
const getProductByCategoryServiceObj = {
    getProductByCategory: Product_service_1.getProductByCategory
};
const getProductByCategoryService = (0, products_controller_1.GetProductByCategoryService)(getProductByCategoryServiceObj);
exports.getProductByCategoryService = getProductByCategoryService;
const getProductWithOptionsServiceObj = {
    getProductWithOptions: Product_service_1.getProductWithOptions
};
const getProductWithOptionsService = (0, products_controller_1.getProductWithOptionService)(getProductWithOptionsServiceObj);
exports.getProductWithOptionsService = getProductWithOptionsService;
const searchProductsObj = {
    searchProducts: Product_service_1.searchProducts
};
const searchProductsService = (0, products_controller_1.SearchProductsService)(searchProductsObj);
exports.searchProductsService = searchProductsService;
//# sourceMappingURL=products.container.js.map