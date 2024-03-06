import { CategoryService } from "../controllers/category.controller"
import { getAllCategory } from "../models/Category.service"
const categoryServiceObj = {
  getAllCategory
}


const categoryService = CategoryService(categoryServiceObj);

export {categoryService}
