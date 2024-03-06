import { Request, Response } from 'express';
import { IAddProductService } from '../types/cart';
import * as E from "fp-ts/Either"
import * as T from "fp-ts/lib/Task";
import * as O from 'fp-ts/Option';
import { flow, pipe } from 'fp-ts/lib/function';
import { either, task, taskEither } from 'fp-ts';

const isNullOrUndefined = <T extends {} | null | undefined>(data: T): boolean => data === null || data === undefined;


export const AddProductToCartService = (dependencies: IAddProductService) => async (req: Request, res: Response) => {
  try {
    const { user, body } = req;
    const handleMissingProductInfo = () => taskEither.of(`missing product details `);
    const handleMissingCartId = () => taskEither.of(`missing cart id `);

    const addProductToCart = (productDetails: any) => (cartId: any) => {
      return pipe(
        () => dependencies.addProductToCart(productDetails, cartId),
        taskEither.map((result) => `${result}`)
      )
    }

    let productAddedResult = pipe(
      body?.data,
      O.fromNullable,
      O.fold(
        handleMissingProductInfo,
        (productDetails) =>
          pipe(
            user?.cartId,
            O.fromNullable,
            O.fold(
              handleMissingCartId,
              addProductToCart(productDetails)
            )
          )

      )
    )();

    productAddedResult.then((data) => {
      either.fold(
        (result) => res.status(400).json({ status: 'ERROR', message: result }),
        (result) => res.status(200).json({ status: 'PRODUCT_ADDED', message: result })
      )(data)
    })
  } catch (err: any) {
    console.log(err)
    return res.status(400).json({ status: "ERROR", message: err })
  }

}

const isProductInCart = (productIdInCartArray: String[], productId: any) => {
  return (productIdInCartArray.find(prdId => prdId.toString() === productId)) === undefined ? false : true;
}

export const RemoveProductFromCartService = (dependencies: any) => async (req: Request, res: Response) => {
  try {
    const { body } = req;
    // if (!isProductInCart(req.user?.cartId, body.product._id)) return res.status(200).json({ message: "no product found in cart" });
    const removeFromCart = await dependencies.removeProductFromCart(body.product, req.user?.cartId);

    if (removeFromCart.includes("SUCCESS")) {
      return res.status(200).json({
        status: "success", message: removeFromCart.message
      })
    }
    return res.status(400).json({ status: "error" })
  } catch (error: any) {
    console.log(error)
    return res.status(400).json({ status: "error", message: "product cannot remove from cart" })
  }
}


export const GetAllProductFromCartService = (dependencies: any) => async (req: Request, res: Response) => {
  try {
    const { user } = req
    const cartProduct = await dependencies.getAllProductFromCart(user?.cartId?.id?.toString())
    return res.status(200).json({ status: "success", data: cartProduct })
  } catch (err: any) {
    console.log(err)
    return res.status(400).json({ status: 'error', message: "Internal Server Error" })
  }
}


export const UpdateProductQtyService = (dependencies: any) => async (req: Request, res: Response) => {
  try {
    const {user,body} = req;
    dependencies.updateProductQty(body,user.cartId._id.toString())
    res.status(200).json({pl:"l"})

  } catch (err: any) {
    console.log(err);
  }
} 

