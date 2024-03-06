"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategory = exports.addCategory = void 0;
const Category_model_1 = __importDefault(require("./Category.model"));
const addCategory = async (categoryName) => {
    try {
        const categoryModel = new Category_model_1.default({
            cty: categoryName
        });
        return await categoryModel.save();
    }
    catch (error) {
        if (error.code === 11000 || error.code === 11001) {
            throw { status: 409, message: 'Duplicate key error' };
        }
        else {
            throw { status: 500, message: 'Internal server error' };
        }
    }
};
exports.addCategory = addCategory;
const getAllCategory = async () => {
    try {
        const ctyList = await Category_model_1.default.find();
        return ctyList;
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.getAllCategory = getAllCategory;
//# sourceMappingURL=Category.service.js.map