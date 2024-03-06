import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/product";


const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  qty: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    required: true
  },
  inventoryId: {
    type: Schema.ObjectId,
    ref: "Inventory"
  },
  rating: {
    type: [Number],
    default: [0, 0, 0, 0, 0]
  },
  status: {
    type: Boolean,
  },
  imageUrls: [{
    type: String,
  }]
})

productSchema.index({ name: 1, description: 1 }, { unique: true })

const Product = mongoose.model('Product', productSchema);

export default Product;
