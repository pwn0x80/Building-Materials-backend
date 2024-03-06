"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var UserRoles;
(function (UserRoles) {
    UserRoles["ADMIN"] = "admin";
    UserRoles["MEMBER"] = "member";
    UserRoles["DEVELOPER"] = "developer";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
const UserSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        enum: ["ADMIN", "MEMBER", "DEVELOPER"],
        default: "MEMBER"
    },
    hash: String,
    salt: String,
    cartId: { type: mongoose_1.default.Schema.ObjectId, ref: "Cart" }
});
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
//# sourceMappingURL=User.model.js.map