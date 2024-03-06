"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductQtyService = exports.getAllProductFromCartService = exports.removeProductFromCartService = exports.addProductToCartService = void 0;
const cart_controller_1 = require("../controllers/cart.controller");
const Cart_service_1 = require("../models/Cart.service");
const cart_controller_2 = require("../controllers/cart.controller");
const addProductToCartServiceObj = {
    addProductToCart: Cart_service_1.addProductToCart
};
const addProductToCartService = (0, cart_controller_1.AddProductToCartService)(addProductToCartServiceObj);
exports.addProductToCartService = addProductToCartService;
const removeProductFromCartServiceObj = {
    removeProductFromCart: Cart_service_1.removeProductFromCart
};
const removeProductFromCartService = (0, cart_controller_1.RemoveProductFromCartService)(removeProductFromCartServiceObj);
exports.removeProductFromCartService = removeProductFromCartService;
const getAllProductFromCartServiceObj = {
    getAllProductFromCart: Cart_service_1.getAllProductFromCart
};
const getAllProductFromCartService = (0, cart_controller_1.GetAllProductFromCartService)(getAllProductFromCartServiceObj);
exports.getAllProductFromCartService = getAllProductFromCartService;
const updateProductQtyServiceObj = {
    updateProductQty: Cart_service_1.updateProductQty
};
const updateProductQtyService = (0, cart_controller_2.UpdateProductQtyService)(updateProductQtyServiceObj);
exports.updateProductQtyService = updateProductQtyService;
//# sourceMappingURL=cart.container.js.map