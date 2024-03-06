"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const InventorySchema = new mongoose_1.default.Schema({
    cartedId: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Cart',
        }
    ]
});
exports.Inventory = mongoose_1.default.model("Inventory", InventorySchema);
//# sourceMappingURL=Inventory.model.js.map