import { Document } from 'mongoose';
import Category from './Category.model';
interface ICategory {
  cty: string,
}
interface ICategoryDocument extends Document {
  cty: String,
}

export const addCategory = async (categoryName: ICategory) => {
  try {
    const categoryModel = new Category({
      cty: categoryName
    })
    return await categoryModel.save();

  } catch (error: any) {
    if (error.code === 11000 || error.code === 11001) {
      throw { status: 409, message: 'Duplicate key error' };
    } else {
      throw { status: 500, message: 'Internal server error' };
    }

  }
};

export const getAllCategory = async ()=>{
  try{
    const ctyList = await Category.find()
    return ctyList;
  }catch(err:any){
    throw new Error(err);
  }
}
