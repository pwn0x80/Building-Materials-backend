import mongoose, { Schema } from "mongoose"
import { v4 as uuidv4 } from 'uuid';
const OrderSchema = new Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
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
        default: uuidv4
      },

      // purchase refund cancel
      prd_order_status: {
        type: String,
        default: "PURCHASE"
      },
      pId: {
        type: mongoose.Schema.Types.ObjectId,
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
})

const Order = mongoose.model("Order", OrderSchema)
export default Order;
