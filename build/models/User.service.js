"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.createUser = void 0;
const User_model_1 = __importDefault(require("./User.model"));
const Cart_model_1 = require("./Cart.model");
const createUser = async (userDetail) => {
    try {
        const newCart = new Cart_model_1.Cart();
        const userModel = new User_model_1.default({
            email: userDetail.email,
            salt: userDetail.salt,
            hash: userDetail.hash,
            cartId: newCart._id
        });
        await Promise.all([userModel.save(), newCart.save()]);
        return { status: "success", message: "New User created." };
    }
    catch (error) {
        //11000 Duplicate account error
        if (error.code == 11000) {
            throw { status: "DUPLICATE_ACCOUNT", message: "duplicate account error" };
        }
        throw { status: "error", message: "internal error" };
    }
};
exports.createUser = createUser;
async function getUserByEmail(email) {
    try {
        let userDetail = await User_model_1.default.findOne({ email }, "hash salt");
        if (userDetail) {
            return { status: "success", message: "USER_FOUND", userDetail: userDetail };
        }
        else {
            return { status: "error", message: "USER_NOT_FOUND" };
        }
    }
    catch (error) {
        console.log(error);
        throw { status: "error", message: `Error getting user by username: ${error.message}` };
    }
}
exports.getUserByEmail = getUserByEmail;
//# sourceMappingURL=User.service.js.map