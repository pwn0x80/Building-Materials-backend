"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const CategoryService = (dependencies) => async (req, res) => {
    try {
        const ctyList = await dependencies.getAllCategory();
        res.status(200).json({ status: "success", data: ctyList });
    }
    catch (err) {
        res.status(500).json({ status: 'error', message: err });
    }
};
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.controller.js.map