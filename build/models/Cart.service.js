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
exports.updateProductQty = exports.getAllProductFromCart = exports.removeProductFromCart = exports.addProductToCart = void 0;
const Cart_model_1 = require("../models/Cart.model");
const Inventory_model_1 = require("./Inventory.model");
const E = __importStar(require("fp-ts/Either"));
const addProductToCart = async (productDetail, cartId) => {
    try {
        const cart = await Cart_model_1.Cart.findById(cartId?.id);
        if (!cart) {
            return E.left("CART_NOT_FIND");
        }
        const existingProduct = cart.products.find(product => product?.pId?.toString() === productDetail?.id?.toString());
        if (existingProduct) {
            return E.left("ALREADY_EXIST");
        }
        if (cart.products.length >= 20) {
            return E.left("MAX_PRODUCT_EXCEED");
        }
        const inventoryUpdate = await Inventory_model_1.Inventory.findByIdAndUpdate(productDetail.inventoryId, {
            $push: {
                cartedId: cartId.id,
            },
        });
        const cartUpdate = await Cart_model_1.Cart.findByIdAndUpdate(cartId.id, {
            $push: {
                products: {
                    pId: productDetail.id,
                    name: productDetail.name,
                    qty: productDetail.qty,
                    price: productDetail.price,
                    imgUrls: productDetail.imgUrls,
                    inventoryId: productDetail.inventoryId
                },
            },
        });
        const [inventoryResult, cartResult] = await Promise.all([inventoryUpdate, cartUpdate]);
        if (inventoryResult && cartResult) {
            console.log("success in adding to cart cart.service ");
            return E.right("SUCCESS");
            // return { status: "success", message: "Item added to the cart" };
        }
        else {
            console.log("fail in adding to cart cart.service ");
            return E.left("FAIL_TO_ADD_AT_BOTH");
            // return { status: "fail", message: "fail to add product in cart" };
        }
    }
    catch (error) {
        console.error("Error in addProduct:", error);
        return E.left("hihhih");
        // return { status: 'error', message: "Error adding the item to the cart" };
    }
};
exports.addProductToCart = addProductToCart;
const removeProductFromCart = async (product, cartId) => {
    try {
        const updatedCart = Cart_model_1.Cart.findByIdAndUpdate(cartId, {
            $pull: {
                products: { pId: product.pId }
            }
        });
        const updateInventory = Inventory_model_1.Inventory.findOneAndUpdate(product.inventoryId, {
            $pull: {
                cartedId: cartId.id
            }
        });
        const [inventoryResult, cartResult] = await Promise.all([updatedCart, updateInventory]);
        if (inventoryResult && cartResult) {
            console.log("success in adding to cart cart.service ");
            return "SUCCESS";
        }
        else {
            console.log("fail in adding to cart cart.service ");
            throw new Error("FAIL_TO_REMOVE_FROM_BOTH");
        }
    }
    catch (error) {
        throw error instanceof Error ? error : new Error(error);
    }
};
exports.removeProductFromCart = removeProductFromCart;
const getAllProductFromCart = async (userId) => {
    try {
        const cartProduct = await Cart_model_1.Cart.findById(userId);
        if (!cartProduct)
            throw "no data";
        return cartProduct?.products;
    }
    catch (err) {
        throw err;
    }
};
exports.getAllProductFromCart = getAllProductFromCart;
const updateProductQty = async (productDetails, cartId) => {
    try {
        const cart = await Cart_model_1.Cart.findByIdAndUpdate(cartId, { $set: { 'products.$[elem].qty': productDetails.qty } }, { arrayFilters: [{ 'elem.pId': productDetails.pId }], new: true });
        if (!cart)
            return false;
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
exports.updateProductQty = updateProductQty;
//# sourceMappingURL=Cart.service.js.map