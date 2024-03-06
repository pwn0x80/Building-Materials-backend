import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema({
  pincode: {
    type: Number,
    unique: true,
    // sparse: true
  },
  shippingCharge: {
    type: Number,
    default: 0
  },
})


const Location = mongoose.model("Location", LocationSchema)

export default Location;
