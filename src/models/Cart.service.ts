import { instanceOf } from "effect/Match";
import { Cart } from "../models/Cart.model"
import { IProduct } from "../types/product";
import { Inventory } from "./Inventory.model"
import * as E from "fp-ts/Either"

import * as TE from 'fp-ts/lib/TaskEither'

export const addProductToCart = async (productDetail: IProduct, cartId: any) => {
  try {
    const cart = await Cart.findById(cartId?.id);

    if (!cart) {
      return E.left("CART_NOT_FIND")
    }

    const existingProduct = cart.products.find(product => product?.pId?.toString() === productDetail?.id?.toString());

    if (existingProduct) {
      return E.left("ALREADY_EXIST")
    }

    if (cart.products.length >= 20) {
      return E.left("MAX_PRODUCT_EXCEED")
    }

    const inventoryUpdate = await Inventory.findByIdAndUpdate(productDetail.inventoryId, {
      $push: {
        cartedId: cartId.id,
      },
    });
    const cartUpdate = await Cart.findByIdAndUpdate(cartId.id, {
      $push: {
        products: {
          pId: productDetail.id,
          name: productDetail.name,
          qty: productDetail.qty,
          price: productDetail.price,
          imgUrls: productDetail.imgUrls,
          inventoryId: productDetail.inventoryId
        },
      },
    });

    const [inventoryResult, cartResult] = await Promise.all([inventoryUpdate, cartUpdate]);

    if (inventoryResult && cartResult) {
      console.log("success in adding to cart cart.service ")
      return E.right("SUCCESS")
      // return { status: "success", message: "Item added to the cart" };
    } else {
      console.log("fail in adding to cart cart.service ")
      return E.left("FAIL_TO_ADD_AT_BOTH")
      // return { status: "fail", message: "fail to add product in cart" };
    }
  } catch (error: any) {
    console.error("Error in addProduct:", error);
    return E.left("hihhih")

    // return { status: 'error', message: "Error adding the item to the cart" };
  }

};

export const removeProductFromCart = async (product: any, cartId: any) => {
  try {
    const updatedCart = Cart.findByIdAndUpdate(cartId, {
      $pull: {
        products: { pId: product.pId }
      }
    });

    const updateInventory = Inventory.findOneAndUpdate(product.inventoryId, {
      $pull: {
        cartedId: cartId.id
      }
    });
    const [inventoryResult, cartResult] = await Promise.all([updatedCart, updateInventory])
    if (inventoryResult && cartResult) {
      console.log("success in adding to cart cart.service ")
      return "SUCCESS"
    } else {
      console.log("fail in adding to cart cart.service ")
      throw new Error("FAIL_TO_REMOVE_FROM_BOTH")
    }
  } catch (error: any) {
    throw error instanceof Error ? error : new Error(error);
  }
}


export const getAllProductFromCart = async (userId: string) => {
  try {
    const cartProduct = await Cart.findById(userId)
    if (!cartProduct) throw "no data";
    return cartProduct?.products;
  } catch (err: any) {
    throw err;

  }
}

export const updateProductQty = async (productDetails: any, cartId: string) => {
  try {
    const cart = await Cart.findByIdAndUpdate(
      cartId,
      { $set: { 'products.$[elem].qty': productDetails.qty } },
      { arrayFilters: [{ 'elem.pId': productDetails.pId }], new: true }
    );
    if (!cart) return false
    return true
  } catch (err: any) {
    console.log(err)
    return false;
  }
}
