import { AddCategoryService, AddProductService } from "../controllers/admin.controller";
import {addProduct} from "../models/Product.service"
import {addCategory} from "../models/Category.service"
import { TProduct } from "../types/product";
const addProductServiceObj:TProduct = {
  addProduct
}


const addProductService = AddProductService(addProductServiceObj)



const addCategoryServiceObj  = {
 addCategory 
}

const addCategoryService =  AddCategoryService(addCategoryServiceObj);


export { addProductService,addCategoryService }
