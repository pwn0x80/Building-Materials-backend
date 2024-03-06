"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDB = void 0;
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
function connectMongoDB() {
    mongoose_1.default.connection.on('connected', () => console.log('db connected..'));
    mongoose_1.default.connection.on('open', () => console.log('open'));
    mongoose_1.default.connection.on('disconnected', () => console.log('disconnected'));
    mongoose_1.default.connection.on('reconnected', () => console.log('reconnected'));
    mongoose_1.default.connection.on('disconnecting', () => console.log('disconnecting'));
    mongoose_1.default.connection.on('close', () => console.log('close'));
    if (process.env.mongodb) {
        mongoose_1.default.connect(process.env.mongodb);
    }
    else {
        console.error('MongoDB connection string is undefined.');
    }
}
exports.connectMongoDB = connectMongoDB;
//# sourceMappingURL=database.js.map