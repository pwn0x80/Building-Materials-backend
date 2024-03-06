"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelOrderService = exports.getUserPendingOrdersService = exports.placeOrderService = void 0;
const order_controller_1 = require("../controllers/order.controller");
const Order_service_1 = require("../models/Order.service");
const paymentServiceObj = {
    processPayment: Order_service_1.processPayment
};
const placeOrderService = (0, order_controller_1.PlaceOrderService)(paymentServiceObj);
exports.placeOrderService = placeOrderService;
const getUserPendingOrdersServiceObj = {
    getUserPendingOrdersDB: Order_service_1.getUserPendingOrdersDB
};
const getUserPendingOrdersService = (0, order_controller_1.GetUserPendingOrdersService)(getUserPendingOrdersServiceObj);
exports.getUserPendingOrdersService = getUserPendingOrdersService;
const cancelOrderServiceObj = {
    cancelOrderDB: Order_service_1.cancelOrderDB
};
const cancelOrderService = (0, order_controller_1.CancelOrderService)(cancelOrderServiceObj);
exports.cancelOrderService = cancelOrderService;
//# sourceMappingURL=order.container.js.map