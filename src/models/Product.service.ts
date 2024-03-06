import { ICtyProductQuery, IProduct, ISearchProductQuery, QueryOptions } from "../types/product";
import { Inventory } from "./Inventory.model";
import Product from "./Product.model"
import { Document, Types } from 'mongoose';


export const addProduct = async (productDetail: any) => {
  const inventoryModel = new Inventory()
  await inventoryModel.save();
  try {
    const productModel = new Product({
      name: productDetail.name,
      description: productDetail.description,
      price: productDetail.price,
      category: productDetail.category,
      status: productDetail.status,
      imageUrls: productDetail.imageUrls,
      inventoryId: inventoryModel._id
    })
    await productModel.save();
    return { status: "success", message: "new Item Added" }
  } catch (error: any) {
    throw { status: "error", message: "fail to add product" }
  }
}

export const getProductById = async (query: string, options: QueryOptions) => {
  try {
    const productsQuery = Product.findById(query)

    if (options.limit !== undefined) {
      productsQuery.limit(options.limit);
    }

    let product = await productsQuery.exec();
    if (!product) {
      // return { status: "error", message: "no product found" };
      return null;
    }
    return product;
    // return { status: "success", data: product, message: "product added" }

  } catch (error: any) {
    throw { status: "error", message: "internal server error" };
  }
};
export const getProductByName = async (query: string, options: QueryOptions) => {
  try {
    const productsQuery = Product.find({ name: query })

    if (options.limit !== undefined) {
      productsQuery.limit(options.limit);
    }

    const products = await productsQuery.exec();
    if (!products) {
      // return { status: "error", message: "no product found" };
      return null
    }
    return products
    // return { status: "success", data: products, message: "product added" }
  } catch (error: any) {
    throw { status: "error", message: "internal server error" };
  }
};

export const getProductByCategory = async (query: ICtyProductQuery, options: QueryOptions) => {
  const { prdCtyName, page } = query;
  let limit = 10;
  let skip = limit * (page - 1);




  const categoryPipeline2 = [
    {
      $facet: {
        products: [
          { $match: { category: { $regex: new RegExp(`^${prdCtyName}$`, 'i') } } },
          { $skip: skip },

          { $limit: limit },
          { $project: { name: 1, description: 1, price: 1, category: 1, rating: 1, imageUrls: 1 } },
        ],
        count: [
          { $match: { category: { $regex: new RegExp(`^${prdCtyName}$`, 'i') } } },
          { $group: { _id: null, count: { $sum: 1 } } },
        ],
      },
    },
    {
      '$project': {
        'products': '$products',
        'count': {
          $ceil: {
            $divide: [
              { $first: '$count.count' },
              limit
            ]
          }
        }
      }
    }
  ];
  try {
    const productsQuery = await Product.aggregate(categoryPipeline2);
    if (!productsQuery) {
      return null;
    }
    return productsQuery
  } catch (error: any) {
    throw { status: "error", message: "internal server error" };
  }
};


export const getProductWithOptions = async (options: QueryOptions): Promise<IProduct[] | {} | null> => {

  try {
    const productsQuery = Product.find()
    if (options.limit !== undefined) {
      productsQuery.limit(options.limit);
    } else {
      productsQuery.limit(10);
    }

    const products = await productsQuery.exec();
    if (!products) {
      return null
    }
    return products;

  } catch (error: any) {
    console.log(error)
    throw { status: "error", message: "internal server error" };
  }
}


export const searchProducts = async (query: ISearchProductQuery, opt: any): Promise<IProduct[] | {} | null> => {
  const { param, page } = query;
  let regexParam = new RegExp(param);
  let limit = 10;
  let skip = limit * (page - 1);

  try {
    // const productsPipeline = [
    //   { $match: { $text: { $search: param } } }
    // ];
    // const productsPipeline2 = [
    //   {
    //     $facet: {
    //       products: [
    //         { $match: { $text: { $search: param } } }
    //       ]
    //     }
    //   }
    // ]
    const productsPipeline3 = [
      {
        $facet: {
          products: [
            {
              $match:
              {
                $or: [
                  {
                    category:
                      { $regex: regexParam }
                  },
                  {
                    name:
                      { $regex: regexParam }
                  }
                ]
              }
            },
            { $skip: skip },
            { $limit: limit },
          ],
          productCount: [
            {
              $match: {
                $or: [
                  { category: { $regex: regexParam } },
                  { name: { $regex: regexParam } }
                ]
              }
            },
            { $count: "count" }
          ]
        }
      },
      {
        $project: {
          products: "$products",
          count: {
            $ceil: { $divide: [{ $first: '$productCount.count' }, limit] }
          }

        }
      }

    ]
    const products = await Product.aggregate(productsPipeline3);
    if (!products) return null
    return products
    // let products =  await Product.find({$text:{$search:"poco"}})
  } catch (error: any) {
    throw error
  }
}
