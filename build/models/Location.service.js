"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addNewLocation = void 0;
const Location_model_1 = __importDefault(require("./Location.model"));
const addNewLocation = async (pincode, shippingCharge) => {
    try {
        const locationModel = new Location_model_1.default({
            pincode: pincode,
            shippingCharge: shippingCharge
        });
        const created = await locationModel.save();
        if (!created) {
            return false;
        }
        return true;
        //db
    }
    catch (err) {
        throw err;
    }
};
exports.addNewLocation = addNewLocation;
//# sourceMappingURL=Location.service.js.map