import mongoose from "mongoose";
import { Cart } from "./Cart.model";
import Order from "./Order.model"
import { v4 as uuidv4 } from 'uuid';
import Product from "./Product.model";
export const processPayment = async (user: any, order: any) => {
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    const cartDetails = await Cart.findById(user.cartId);
    const totalCartAmount = cartDetails?.products.reduce((amt: any, product: any) => {
      return (product.price * product.qty) + amt
    }, 0)
    const newOrder = new Order({
      userId: user._id,
      payment_type: order.optPayment,
      payment_status: 'pending',
      order_status: 'complete',
      total_amt: totalCartAmount,
      products: cartDetails?.products,
      address:{
        name:order.name,
        phNo:order.phNo,
        pincode:order.pincode,
        locality:order.locality,
        address: order.address,
        city:order.city,
        state:order.state,
      }
    })
    if (cartDetails) {
      cartDetails.products = [];
      cartDetails.status="pending";
      await cartDetails.save();
    }
    await newOrder.save()
    await session.commitTransaction();
    await session.endSession();
    return true;
  } catch (err: any) {
    throw err instanceof Error ? err : new Error(err)
  }

}
export const getUserPendingOrdersDB = async (userId: any) => {
  try {
    const orders = await Order.find({ userId: userId, order_status: "complete" })
    if (!orders || orders.length === 0) {
      return null;
    }
    return orders
  } catch (err: any) {
    throw err instanceof Error ? err : new Error(err)

  }
}

export const cancelOrderDB = async (userId: string, prdId: string, ordId: string) => {
  try {
    let orderUpdate = await Order.findOneAndUpdate({
      userId: userId,
      _id: ordId,
      'products.prd_order_id': prdId
    }, {
      $set: {
        'products.$.prd_order_status': 'CANCEL'
      }
    })
    if (!orderUpdate) {
      return null;
    }
    return true;
  } catch (err: any) {
    throw err instanceof Error ? err : new Error(err);
  }

}

