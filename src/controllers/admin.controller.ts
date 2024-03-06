import { Request, Response, Express } from 'express';
import { TProduct } from '../types/product';

interface BodyData {
  productName: string;
  productDescription: string;
  productPrice: number;
  category: string;
  productStatus: string;
}

const productItemDataConstruct = (bodyData: BodyData, imgFileData: Express.Multer.File[]) => {
  const imageArray: string[] = imgFileData.map((data) => data.filename);
  return {
    name: bodyData.productName,
    description: bodyData.productDescription,
    price: bodyData.productPrice,
    category: bodyData.category,
    status: bodyData.productStatus === 'enable',
    imageUrls: imageArray
  };
};

export const AddProductService = (dependencies: TProduct) => async (req: Request, res: Response) => {
  const bodyData: BodyData = req.body;
  const imgFileData: Express.Multer.File[] = req.files as Express.Multer.File[];

  try {
    const productData = productItemDataConstruct(bodyData, imgFileData);
    await dependencies.addProduct(productData);
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const AddCategoryService = (dependencies: any) => async (req: Request, res: Response) => {
  try {
    const bodyData = req.body.cty;
    if (bodyData === undefined) {
      return res.status(400).json({ status: 'error', message: "missing cty" });
    }
    let categoryModel = await dependencies.addCategory(bodyData)
    return res.status(200).json({data:categoryModel, message:"successfully added new Category"})
  } catch (error: any) {
    if (error.status == 409) {
      return res.status(409).json({ status: 'error', message: error.message });
    }
    return res.status(500).json({ status: 'error', message: error.message });

  }

}
