"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwtService_1 = require("../utils/jwtService");
const location_container_1 = require("../containers/location.container");
const router = (0, express_1.Router)();
router.post("/addLocation", jwtService_1.adminVerify, location_container_1.addNewLocationService);
exports.default = router;
//# sourceMappingURL=location.route.js.map