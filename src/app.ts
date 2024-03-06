import 'dotenv/config'
import bodyParser from "body-parser"
import express from "express";
import routes from "./routes/index.js";
import path from "path";
import { startServer } from './config/appInitializer.js';
import { connectMongoDB } from './config/database.js';
import { jwtVerify } from './utils/jwtService.js';

import cookieParser from 'cookie-parser';
var cors = require('cors')
const app = express();
const fs = require('fs');
console.log("--------------", process.env.CORS_ALLOW_URL)
app.use(bodyParser.json())
app.use(cors({
  origin: process.env.CORS_ALLOW_URL,
  credentials: true,
}));

app.use(express.static(path.join(__dirname, '../public')))

app.use(cookieParser());
connectMongoDB();
app.use("/v", jwtVerify, (req: any, res: any) => {
  res.status(200).json({ status: "USER_FOUND", message: 'verify', data: { cart: req.user.cartId, role: req.user.role } })
})



app.use(routes);

startServer(app, 8000)

