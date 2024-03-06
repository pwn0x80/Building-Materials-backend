import { AddProductToCartService, GetAllProductFromCartService, RemoveProductFromCartService } from "../controllers/cart.controller";
import { updateProductQty, addProductToCart, removeProductFromCart, getAllProductFromCart } from "../models/Cart.service"
import { IAddProductService, IGetAllProductFromCartService, IRemoveProductFromService } from "../types/cart";
import { UpdateProductQtyService } from "../controllers/cart.controller";



const addProductToCartServiceObj: IAddProductService = {
  addProductToCart
}

const addProductToCartService = AddProductToCartService(addProductToCartServiceObj);


const removeProductFromCartServiceObj: IRemoveProductFromService = {
  removeProductFromCart
}
const removeProductFromCartService = RemoveProductFromCartService(removeProductFromCartServiceObj)

const getAllProductFromCartServiceObj: IGetAllProductFromCartService = {
  getAllProductFromCart
}


const getAllProductFromCartService = GetAllProductFromCartService(getAllProductFromCartServiceObj)

const updateProductQtyServiceObj: any = {
  updateProductQty
}
const updateProductQtyService = UpdateProductQtyService(updateProductQtyServiceObj)

// const decreaseProductQtyServiceObj:any = {}

// const decreaseProductQtyService = DecreaseProductQtyService(decreaseProductQtyServiceObj)


export {
  addProductToCartService, removeProductFromCartService, getAllProductFromCartService,
  updateProductQtyService,
}
