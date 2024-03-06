"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminVerify = exports.jwtVerify = exports.jwtSign = exports.validPassword = exports.encryptPasswordRegistration = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs = __importStar(require("fs"));
const node_fs_1 = require("node:fs");
const User_model_1 = __importDefault(require("../models/User.model"));
const Cart_model_1 = require("../models/Cart.model");
let iterations = 10000;
let keylen = 64;
let digest = 'sha512';
const privateKey = fs.readFileSync(__dirname + "/../../src/utils/res_priv.pem", "utf-8");
const encryptPasswordRegistration = (rawPassword) => {
    const salt = node_crypto_1.default.randomBytes(32).toString('hex');
    let hash = node_crypto_1.default.pbkdf2Sync(rawPassword, salt, iterations, keylen, digest).toString("hex");
    return { "hash": hash, "salt": salt };
};
exports.encryptPasswordRegistration = encryptPasswordRegistration;
function validPassword(password, hash, salt) {
    var hashVerify = node_crypto_1.default.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
    return hash === hashVerify;
}
exports.validPassword = validPassword;
const jwtSign = (userDetail) => {
    const _id = userDetail.id;
    const payload = {
        sub: _id,
        iat: Date.now()
    };
    const options = {
        algorithm: "RS256",
        expiresIn: '7d'
    };
    const token = jsonwebtoken_1.default.sign(payload, privateKey, options);
    return {
        token: `Bearer ${token}`,
    };
};
exports.jwtSign = jwtSign;
let jwtCert = (0, node_fs_1.readFileSync)(__dirname + "/../../src/utils/res_pub.pem", "utf-8");
// export const jwtVerify = (jwtDetail :{token:string, secretOrPublicKey:Secret})=>{
const jwtVerify = (req, res, next) => {
    if (req.cookies.token === undefined) {
        return res.status(401).json({ status: "USER_NOT_LOGIN", message: "redirect to login page todo" });
    }
    let token = req.cookies.token.slice(7) || null;
    jsonwebtoken_1.default.verify(token, jwtCert, { algorithms: ['RS256'] }, async function (err, payload) {
        if (err) {
            return res.status(401).json({ message: "token problem please login again" });
        }
        if (payload !== undefined) {
            const user = await User_model_1.default.findById(payload.sub, '_id email cartId role').populate("cartId");
            if (!user)
                return res.status(401).json({ status: "USER_NOT_FOUND", message: "redirect to login page" });
            const cart = await Cart_model_1.Cart.findById(user?.cartId);
            console.log(user);
            req.user = user;
        }
        next();
    });
};
exports.jwtVerify = jwtVerify;
const adminVerify = (req, res, next) => {
    if (req.cookies.token === undefined) {
        return res.status(401).json({ message: "redirect to login page todo" });
    }
    let token = req.cookies.token.slice(7) || null;
    jsonwebtoken_1.default.verify(token, jwtCert, { algorithms: ['RS256'] }, async function (err, payload) {
        if (err) {
            return res.status(401).json({ message: "token problem please login again" });
        }
        if (payload !== undefined) {
            const user = await User_model_1.default.findById(payload.sub, '_id email cartId role');
            console.log(user);
            if (!user)
                return res.status(401).json({ status: "NOT_FOUND_USER", message: "redirect to login page" });
            if (user.role.includes("ADMIN")) {
                req.user = user;
                next();
            }
        }
    });
};
exports.adminVerify = adminVerify;
//# sourceMappingURL=jwtService.js.map