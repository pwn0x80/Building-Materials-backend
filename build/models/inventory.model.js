"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const InventorySchema = new mongoose_1.default.Schema({
    cartedId: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'product',
        }
    ]
});
const Inventory = mongoose_1.default.model("Inventory", InventorySchema);
exports.default = Inventory;
//# sourceMappingURL=inventory.model.js.map