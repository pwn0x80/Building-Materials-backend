"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_container_1 = require("../containers/category.container");
const router = (0, express_1.Router)();
router.get("/getAllCategory", category_container_1.categoryService);
exports.default = router;
//# sourceMappingURL=category.route.js.map