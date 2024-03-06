"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProducts = exports.getProductWithOptions = exports.getProductByCategory = exports.getProductByName = exports.getProductById = exports.addProduct = void 0;
const Inventory_model_1 = require("./Inventory.model");
const Product_model_1 = __importDefault(require("./Product.model"));
const addProduct = async (productDetail) => {
    const inventoryModel = new Inventory_model_1.Inventory();
    await inventoryModel.save();
    try {
        const productModel = new Product_model_1.default({
            name: productDetail.name,
            description: productDetail.description,
            price: productDetail.price,
            category: productDetail.category,
            status: productDetail.status,
            imageUrls: productDetail.imageUrls,
            inventoryId: inventoryModel._id
        });
        await productModel.save();
        return { status: "success", message: "new Item Added" };
    }
    catch (error) {
        throw { status: "error", message: "fail to add product" };
    }
};
exports.addProduct = addProduct;
const getProductById = async (query, options) => {
    try {
        const productsQuery = Product_model_1.default.findById(query);
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
    }
    catch (error) {
        throw { status: "error", message: "internal server error" };
    }
};
exports.getProductById = getProductById;
const getProductByName = async (query, options) => {
    try {
        const productsQuery = Product_model_1.default.find({ name: query });
        if (options.limit !== undefined) {
            productsQuery.limit(options.limit);
        }
        const products = await productsQuery.exec();
        if (!products) {
            // return { status: "error", message: "no product found" };
            return null;
        }
        return products;
        // return { status: "success", data: products, message: "product added" }
    }
    catch (error) {
        throw { status: "error", message: "internal server error" };
    }
};
exports.getProductByName = getProductByName;
const getProductByCategory = async (query, options) => {
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
        const productsQuery = await Product_model_1.default.aggregate(categoryPipeline2);
        if (!productsQuery) {
            return null;
        }
        return productsQuery;
    }
    catch (error) {
        throw { status: "error", message: "internal server error" };
    }
};
exports.getProductByCategory = getProductByCategory;
const getProductWithOptions = async (options) => {
    try {
        const productsQuery = Product_model_1.default.find();
        if (options.limit !== undefined) {
            productsQuery.limit(options.limit);
        }
        else {
            productsQuery.limit(10);
        }
        const products = await productsQuery.exec();
        if (!products) {
            return null;
        }
        return products;
    }
    catch (error) {
        console.log(error);
        throw { status: "error", message: "internal server error" };
    }
};
exports.getProductWithOptions = getProductWithOptions;
const searchProducts = async (query, opt) => {
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
                            $match: {
                                $or: [
                                    {
                                        category: { $regex: regexParam }
                                    },
                                    {
                                        name: { $regex: regexParam }
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
        ];
        const products = await Product_model_1.default.aggregate(productsPipeline3);
        if (!products)
            return null;
        return products;
        // let products =  await Product.find({$text:{$search:"poco"}})
    }
    catch (error) {
        throw error;
    }
};
exports.searchProducts = searchProducts;
//# sourceMappingURL=Product.service.js.map