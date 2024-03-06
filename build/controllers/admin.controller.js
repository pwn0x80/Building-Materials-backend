"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddCategoryService = exports.AddProductService = void 0;
const productItemDataConstruct = (bodyData, imgFileData) => {
    const imageArray = imgFileData.map((data) => data.filename);
    return {
        name: bodyData.productName,
        description: bodyData.productDescription,
        price: bodyData.productPrice,
        category: bodyData.category,
        status: bodyData.productStatus === 'enable',
        imageUrls: imageArray
    };
};
const AddProductService = (dependencies) => async (req, res) => {
    const bodyData = req.body;
    const imgFileData = req.files;
    try {
        const productData = productItemDataConstruct(bodyData, imgFileData);
        await dependencies.addProduct(productData);
        res.status(201).json({ message: 'Product added successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.AddProductService = AddProductService;
const AddCategoryService = (dependencies) => async (req, res) => {
    try {
        const bodyData = req.body.cty;
        if (bodyData === undefined) {
            return res.status(400).json({ status: 'error', message: "missing cty" });
        }
        let categoryModel = await dependencies.addCategory(bodyData);
        return res.status(200).json({ data: categoryModel, message: "successfully added new Category" });
    }
    catch (error) {
        if (error.status == 409) {
            return res.status(409).json({ status: 'error', message: error.message });
        }
        return res.status(500).json({ status: 'error', message: error.message });
    }
};
exports.AddCategoryService = AddCategoryService;
//# sourceMappingURL=admin.controller.js.map