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
const mongoose_1 = __importStar(require("mongoose"));
const uuid_1 = require("uuid");
const OrderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.default.Schema.ObjectId,
        ref: "User",
        index: true,
        required: true,
    },
    address: {
        name: {
            type: String
        },
        phNo: {
            type: Number,
        },
        pincode: {
            type: Number,
        },
        locality: {
            type: String,
        },
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        }
    },
    // "Pending", "Received", "Failed", "Refunded"
    // COD ONLINE
    payment_type: {
        type: String,
        // default:"CO"
    },
    payment_status: {
        type: String,
        default: "pending",
        required: true
    },
    // "Pending", "Complete", "Shipped"
    order_status: {
        type: String,
        default: "pending",
        required: true
    },
    total_amt: {
        type: Number,
        required: true
    },
    products: [
        {
            prd_order_id: {
                type: String,
                required: true,
                unique: true,
                default: uuid_1.v4
            },
            // purchase refund cancel
            prd_order_status: {
                type: String,
                default: "PURCHASE"
            },
            pId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "Product"
            },
            name: {
                type: String,
                required: true,
                trim: true,
            },
            qty: {
                type: Number,
            },
            price: {
                type: Number,
                required: true,
                min: 0,
            },
            imgUrls: {
                type: String,
            }
        }
    ]
});
const Order = mongoose_1.default.model("Order", OrderSchema);
exports.default = Order;
//# sourceMappingURL=Order.model.js.map