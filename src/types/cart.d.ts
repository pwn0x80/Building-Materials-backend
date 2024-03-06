import mongoose, { Types } from "mongoose";
import { addProductToCart,getAllProductFromCart,removeProductFromCart } from "../models/Cart.service";
export interface ICartProduct {
  _pId: Types.ObjectId;
  name: string;
  qty: number;
  price: number;
  imgUrl: string;
}

export interface ICart extends Document {
  status: string;
  modifiedOn: Date;
  products: IProduct[];
}


export interface IAddProductService{
  addProductToCart: typeof addProductToCart 
}

export interface IRemoveProductFromService {
  removeProductFromCart: typeof removeProductFromCart
}
export interface IGetAllProductFromCartService{
  getAllProductFromCart: typeof getAllProductFromCart
}
