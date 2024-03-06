import { Request, Response } from "express"
export const PlaceOrderService = (dependencies: any) => async (req: Request, res: Response) => {
  try {
    const { user, body } = req;
    let orderPlaced = await dependencies.processPayment(user, body)
    if (orderPlaced) {
      return res.status(200).json({ message: "success", status: "ORDER_PLACED" })
    }
    return res.status(200).json({ message: "error", status: "ORDER_NOT_PLACE" })
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: "error", status: "Internal Server Error" })
  }
}

export const CancelOrderService = (dependencies: any) => async (req: Request, res: Response) => {
  try {
    const { user, body } = req;
    //userId +  productId  + ordId
    if (body.ordId == null || body.prdId == null) return res.status(400).json({ status: "error", message: "missing order Id or product Id" })
    const ordCancelUpdate = await dependencies.cancelOrderDB(user._id.toString(), body.prdId, body.ordId)
    if (!ordCancelUpdate) {
      return res.status(200).json({ status: "error", message: "NO_ORDER_FOUND" })
    }
    return res.status(200).json({ status: "success", message: "ORDER_CANCELLED" })
  } catch (err: any) {
    return res.status(400).json({ status: "error", message: "Internal Server Error" })
  }
}

export const GetUserPendingOrdersService = (dependencies: any) => async (req: Request, res: Response) => {
  console.log("user")
  try {
    const { user } = req;
    const ordersList = await dependencies.getUserPendingOrdersDB(user?.id)
    if (!ordersList) {
      return res.status(400).json({ status: "ORDER_NOT_FOUND", message: "no pending order found." })
    }
    return res.status(200).json({ status: "success", data: ordersList });
  } catch (err: any) {
    console.log(err)
    return res.status(400).json({ status: "error", message: "Internal Server Error" })
  }
}
