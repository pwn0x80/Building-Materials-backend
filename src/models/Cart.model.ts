import mongoose, { Schema } from "mongoose"
import { ICart } from "../types/cart"


const CartSchema = new Schema<ICart>({
  status: {
    type: String,
    default: "pending",
    required: true
  },
  modifiedOn: { type: Date, default: Date.now },
  products:
    [
      {
        pId: { type: Schema.ObjectId, ref: "Product" },
        name: {
          type: String,
          required: true
        },
        qty: { type: Number, default: 1 },
        price: {
          type: Number,
          required: true
        },
        imgUrls: {
          type: String,
          required: true
        },
      }
    ]
})
const Cart = mongoose.model('Cart', CartSchema)
export  {Cart}

