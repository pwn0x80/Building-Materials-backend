import { Types } from "mongoose";
import { addProduct,getProductById,getProductByName, getProductByCategory,getProductWithOptions,searchProducts } from "../models/Product.service";
export interface IProduct extends Document {
  id?:Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  imgUrls: string[];
  inventoryId?: Types.ObjectId | null | undefined;
  status: boolean | undefined;
  rating:Array<number>;
  qty?:number;
}
export type TProduct = {
  addProduct:typeof addProduct; 
}

export interface QueryOptions {
  limit?: number;
  skip?: number;
}
export interface ICtyProductQuery{
 prdCtyName:string;
  page:numbrt;
}

export interface ISearchProductQuery {
  param:string;
  page:number;
}

export interface IGetProductByIdService{
  // getProductById: (query: string, options: QueryOptions) => Promise<{ status: string; message: string; data?: any }>;
  getProductById: typeof getProductById
}
export interface IGetProductByNameService{
  // getProductByName: (query: string, options: QueryOptions) => Promise<{ status: string; message: string; data?: any }>;
  getProductByName: typeof getProductByName
}
export interface IGetProductByCategoryService{
  // getProductByCategory: (query: ICtyProductQuery, options: QueryOptions) => Promise<any[]| null>;
  getProductByCategory: typeof getProductByCategory
}

export interface IGetProductWithOptionsService{
  // getProductWithOptions :(options:QueryOptions)=>Promise<IProduct[] |{}|null>; 
  getProductWithOptions: typeof getProductWithOptions
}
export interface ISearchProductService{
  // searchProducts:(query:ISearchProductQuery,qty:any)=>Promise<IProduct[] |{}|null>;
  searchProducts: typeof searchProducts
}
