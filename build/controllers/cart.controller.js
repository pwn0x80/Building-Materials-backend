"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductQtyService = exports.GetAllProductFromCartService = exports.RemoveProductFromCartService = exports.AddProductToCartService = void 0;
const O = __importStar(require("fp-ts/Option"));
const function_1 = require("fp-ts/lib/function");
const fp_ts_1 = require("fp-ts");
const isNullOrUndefined = (data) => data === null || data === undefined;
const AddProductToCartService = (dependencies) => async (req, res) => {
    try {
        const { user, body } = req;
        const handleMissingProductInfo = () => fp_ts_1.taskEither.of(`missing product details `);
        const handleMissingCartId = () => fp_ts_1.taskEither.of(`missing cart id `);
        const addProductToCart = (productDetails) => (cartId) => {
            return (0, function_1.pipe)(() => dependencies.addProductToCart(productDetails, cartId), fp_ts_1.taskEither.map((result) => `${result}`));
        };
        let productAddedResult = (0, function_1.pipe)(body?.data, O.fromNullable, O.fold(handleMissingProductInfo, (productDetails) => (0, function_1.pipe)(user?.cartId, O.fromNullable, O.fold(handleMissingCartId, addProductToCart(productDetails)))))();
        productAddedResult.then((data) => {
            fp_ts_1.either.fold((result) => res.status(400).json({ status: 'ERROR', message: result }), (result) => res.status(200).json({ status: 'PRODUCT_ADDED', message: result }))(data);
        });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ status: "ERROR", message: err });
    }
};
exports.AddProductToCartService = AddProductToCartService;
const isProductInCart = (productIdInCartArray, productId) => {
    return (productIdInCartArray.find(prdId => prdId.toString() === productId)) === undefined ? false : true;
};
const RemoveProductFromCartService = (dependencies) => async (req, res) => {
    try {
        const { body } = req;
        // if (!isProductInCart(req.user?.cartId, body.product._id)) return res.status(200).json({ message: "no product found in cart" });
        const removeFromCart = await dependencies.removeProductFromCart(body.product, req.user?.cartId);
        if (removeFromCart.includes("SUCCESS")) {
            return res.status(200).json({
                status: "success", message: removeFromCart.message
            });
        }
        return res.status(400).json({ status: "error" });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ status: "error", message: "product cannot remove from cart" });
    }
};
exports.RemoveProductFromCartService = RemoveProductFromCartService;
const GetAllProductFromCartService = (dependencies) => async (req, res) => {
    try {
        const { user } = req;
        const cartProduct = await dependencies.getAllProductFromCart(user?.cartId?.id?.toString());
        return res.status(200).json({ status: "success", data: cartProduct });
    }
    catch (err) {
        console.log(err);
        return res.status(400).json({ status: 'error', message: "Internal Server Error" });
    }
};
exports.GetAllProductFromCartService = GetAllProductFromCartService;
const UpdateProductQtyService = (dependencies) => async (req, res) => {
    try {
        const { user, body } = req;
        dependencies.updateProductQty(body, user.cartId._id.toString());
        res.status(200).json({ pl: "l" });
    }
    catch (err) {
        console.log(err);
    }
};
exports.UpdateProductQtyService = UpdateProductQtyService;
//# sourceMappingURL=cart.controller.js.map