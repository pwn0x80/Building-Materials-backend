import { PlaceOrderService, GetUserPendingOrdersService, CancelOrderService } from "../controllers/order.controller"
import { processPayment, getUserPendingOrdersDB,  cancelOrderDB } from "../models/Order.service";



const paymentServiceObj = {
  processPayment
}


const placeOrderService = PlaceOrderService(paymentServiceObj);


const getUserPendingOrdersServiceObj = {
  getUserPendingOrdersDB
}
const getUserPendingOrdersService = GetUserPendingOrdersService(getUserPendingOrdersServiceObj)

const cancelOrderServiceObj = {
  cancelOrderDB
} 
const cancelOrderService = CancelOrderService(cancelOrderServiceObj)

export { placeOrderService, getUserPendingOrdersService,cancelOrderService }

