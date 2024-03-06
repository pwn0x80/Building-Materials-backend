"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const index_js_1 = __importDefault(require("./routes/index.js"));
const path_1 = __importDefault(require("path"));
const appInitializer_js_1 = require("./config/appInitializer.js");
const database_js_1 = require("./config/database.js");
const jwtService_js_1 = require("./utils/jwtService.js");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
var cors = require('cors');
const app = (0, express_1.default)();
const fs = require('fs');
console.log("--------------", process.env.CORS_ALLOW_URL);
app.use(body_parser_1.default.json());
app.use(cors({
    origin: process.env.CORS_ALLOW_URL,
    credentials: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use((0, cookie_parser_1.default)());
(0, database_js_1.connectMongoDB)();
app.use("/v", jwtService_js_1.jwtVerify, (req, res) => {
    res.status(200).json({ status: "USER_FOUND", message: 'verify', data: { cart: req.user.cartId, role: req.user.role } });
});
app.use(index_js_1.default);
(0, appInitializer_js_1.startServer)(app, 8000);
//# sourceMappingURL=app.js.map