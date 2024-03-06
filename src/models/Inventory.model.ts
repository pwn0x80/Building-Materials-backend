import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema(
  {
    cartedId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
      }
    ]
  }
)

export const Inventory = mongoose.model("Inventory", InventorySchema);
