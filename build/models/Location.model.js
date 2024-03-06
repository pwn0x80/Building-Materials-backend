"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LocationSchema = new mongoose_1.default.Schema({
    pincode: {
        type: Number,
        unique: true,
        // sparse: true
    },
    shippingCharge: {
        type: Number,
        default: 0
    },
});
const Location = mongoose_1.default.model("Location", LocationSchema);
exports.default = Location;
//# sourceMappingURL=Location.model.js.map