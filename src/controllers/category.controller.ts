import { Request, Response } from 'express';

export const CategoryService = (dependencies:any)=>async(req:Request,res:Response)=>{
  try{
  const ctyList =await dependencies.getAllCategory();
  res.status(200).json({status:"success", data:ctyList});
  }catch(err:any){
    res.status(500).json({status:'error',message:err});
  }
}
