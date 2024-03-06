import { Request, Response } from 'express';
import { IGetProductByCategoryService, IGetProductByIdService, IGetProductByNameService, IGetProductWithOptionsService, ISearchProductService } from '../types/product';


export const GetProductByIdService = (dependencies: IGetProductByIdService) => async (req: Request, res: Response) => {
  if (req.query.pdId === undefined) {
    return res.status(401).json({ status: 'error', message: "prd Id Required" })
  }
  let prdId = String(req.query.pdId);
  let opt = req.params;
  try {
    const products = await dependencies.getProductById(prdId, opt)
    if(!products) return res.status(400).json({message:"no product found",status:"error"})
    return res.status(200).json({status:"success", data:products})
  } catch (err: any) {
    res.status(400).json({ status: "error",message:"internal server error" })
  }
}
export const GetProductByNameService = (dependencies: IGetProductByNameService) => async (req: Request, res: Response) => {
  try{
  if (req.query.pdName === undefined) {
    return res.status(401).json({ status: 'error', message: "prd Name Required" })
  }
  let prdName = String(req.query.pdName);
  let opt = req.params;

  const products = await dependencies.getProductByName(prdName, opt)
  if (!products) return res.status(400).json({ message:"product not found", status: "error" })
  return res.status(200).json({data:products, status:"success"})
  }catch(err:any){
    return res.status(400).json({status:"error",message:"internal error"})
  }
}
export const GetProductByCategoryService = (dependencies: IGetProductByCategoryService) => async (req: Request, res: Response) => {
  if (req.query.category === undefined || req.query.page === undefined) {
    return res.status(401).json({ status: "error", message: "prd  Cty or pg Required" })
  }
  try {

    let prdCtyName = String(req.query.category);
    let page = Number(req.query.page);
    let opt = req.params;

    const products = await dependencies.getProductByCategory({ prdCtyName: prdCtyName, page: page }, opt)
    if (!products) return res.status(400).json({ status: "error", message: "no product found" })
    return res.status(200).json({ status: "success", data: products, message: "product added" })
  } catch (err) {

    return res.status(500).json({ status: 'error', message:"internal error" })
  }
}

export const getProductWithOptionService = (dependencies: IGetProductWithOptionsService) => async (req: Request, res: Response) => {
  const opt = req.params;
  try {
    const products = await dependencies.getProductWithOptions(opt);
    if(!products) return res.status(400).json({status:"error", message:"no product found"})
    return res.status(200).json({ status: "success", data: products })
  } catch (err:any) {
    return res.status(500).json({ status: 'error',message:JSON.stringify(err) })
  }
}


export const SearchProductsService = (dependencies: ISearchProductService) => async (req: Request, res: Response) => {
  try {
    if (req.query.param?.length === 0) return res.status(200).json({ status: "error", message: "no search words" })
    if (req.query.page === undefined || req.query.param === undefined) {
      return res.status(401).json({ status: "error", message: "no result found." })
    }
    const opt = req.params;
    const param = String(req?.query?.param)
    const page = Number(req?.query?.page)

    const products = await dependencies.searchProducts({ param, page }, opt);
    if(!products) return res.status(500).json({status:"error", message:"no product found"})
    return res.status(200).json({ status: 'success', data: products })
  } catch (error: any) {
    return res.status(500).json({status:"error",message:JSON.stringify(error)});
  }
}

