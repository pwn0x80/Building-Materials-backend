"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrderDB = exports.getUserPendingOrdersDB = exports.processPayment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Cart_model_1 = require("./Cart.model");
const Order_model_1 = __importDefault(require("./Order.model"));
const processPayment = async (user, order) => {
    try {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        const cartDetails = await Cart_model_1.Cart.findById(user.cartId);
        const totalCartAmount = cartDetails?.products.reduce((amt, product) => {
            return (product.price * product.qty) + amt;
        }, 0);
        const newOrder = new Order_model_1.default({
            userId: user._id,
            payment_type: order.optPayment,
            payment_status: 'pending',
            order_status: 'complete',
            total_amt: totalCartAmount,
            products: cartDetails?.products,
            address: {
                name: order.name,
                phNo: order.phNo,
                pincode: order.pincode,
                locality: order.locality,
                address: order.address,
                city: order.city,
                state: order.state,
            }
        });
        if (cartDetails) {
            cartDetails.products = [];
            cartDetails.status = "pending";
            await cartDetails.save();
        }
        await newOrder.save();
        await session.commitTransaction();
        await session.endSession();
        return true;
    }
    catch (err) {
        throw err instanceof Error ? err : new Error(err);
    }
};
exports.processPayment = processPayment;
const getUserPendingOrdersDB = async (userId) => {
    try {
        const orders = await Order_model_1.default.find({ userId: userId, order_status: "complete" });
        if (!orders || orders.length === 0) {
            return null;
        }
        return orders;
    }
    catch (err) {
        throw err instanceof Error ? err : new Error(err);
    }
};
exports.getUserPendingOrdersDB = getUserPendingOrdersDB;
const cancelOrderDB = async (userId, prdId, ordId) => {
    try {
        let orderUpdate = await Order_model_1.default.findOneAndUpdate({
            userId: userId,
            _id: ordId,
            'products.prd_order_id': prdId
        }, {
            $set: {
                'products.$.prd_order_status': 'CANCEL'
            }
        });
        if (!orderUpdate) {
            return null;
        }
        return true;
    }
    catch (err) {
        throw err instanceof Error ? err : new Error(err);
    }
};
exports.cancelOrderDB = cancelOrderDB;
//# sourceMappingURL=Order.service.js.map