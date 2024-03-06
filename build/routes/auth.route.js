"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const auth_container_1 = require("../containers/auth.container");
router.post('/register', auth_container_1.registrationService);
router.post('/login', auth_container_1.loginService);
router.post("/logout", auth_container_1.logoutService);
exports.default = router;
//# sourceMappingURL=auth.route.js.map