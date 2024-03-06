import { GetProductByCategoryService, GetProductByIdService, GetProductByNameService, SearchProductsService, getProductWithOptionService } from "../controllers/products.controller";
import {getProductWithOptions, getProductById, getProductByName,getProductByCategory,searchProducts } from "../models/Product.service";
import { IGetProductByCategoryService, IGetProductByIdService, IGetProductByNameService, ISearchProductService } from "../types/product";

const getProductByIdServiceObj:IGetProductByIdService = {
  getProductById
}

const productByIdService = GetProductByIdService(getProductByIdServiceObj)  

const getProductByNameServiceObj:IGetProductByNameService = {
  getProductByName
}

const productByNameService = GetProductByNameService(getProductByNameServiceObj);




const getProductByCategoryServiceObj:IGetProductByCategoryService = {
  getProductByCategory
}

const getProductByCategoryService = GetProductByCategoryService(getProductByCategoryServiceObj);


const getProductWithOptionsServiceObj = {
  getProductWithOptions
}

const getProductWithOptionsService  = getProductWithOptionService(getProductWithOptionsServiceObj) 


const searchProductsObj:ISearchProductService  ={
  searchProducts
}

const searchProductsService = SearchProductsService(searchProductsObj);

export {searchProductsService,productByIdService,productByNameService, getProductByCategoryService, getProductWithOptionsService }
