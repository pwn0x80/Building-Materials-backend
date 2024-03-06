import crypto, { Verify } from "node:crypto";
import jwt, { Secret } from "jsonwebtoken";
import * as fs from "fs";
import { readFile, readFileSync } from "node:fs";
import { Request, Response, NextFunction } from 'express';
import User from "../models/User.model";
import { Cart } from "../models/Cart.model";
let iterations = 10000;
let keylen = 64;
let digest = 'sha512'
const privateKey: jwt.Secret = fs.readFileSync(__dirname + "/../../src/utils/res_priv.pem", "utf-8");


export const encryptPasswordRegistration = (rawPassword: string) => {
  const salt = crypto.randomBytes(32).toString('hex');
  let hash = crypto.pbkdf2Sync(rawPassword, salt, iterations, keylen, digest).toString("hex")
  return { "hash": hash, "salt": salt };
}


export function validPassword(password: string, hash: string, salt: string) {
  var hashVerify = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
  return hash === hashVerify;
}


export const jwtSign = (userDetail: { id: string }) => {

  const _id: string = userDetail.id;
  const payload = {
    sub: _id,
    iat: Date.now()
  };
  const options: jwt.SignOptions = {
    algorithm: "RS256",
    expiresIn: '7d'
  };

  const token: string = jwt.sign(payload, privateKey, options);

  return {
    token: `Bearer ${token}`,
  }
}
let jwtCert = readFileSync(__dirname + "/../../src/utils/res_pub.pem", "utf-8")
// export const jwtVerify = (jwtDetail :{token:string, secretOrPublicKey:Secret})=>{
export const jwtVerify = (req: Request, res: Response, next: any) => {
  if (req.cookies.token === undefined) {
    return res.status(401).json({ status: "USER_NOT_LOGIN", message: "redirect to login page todo" })
  }
  let token = req.cookies.token.slice(7) || null;

  jwt.verify(token, jwtCert, { algorithms: ['RS256'] }, async function(err, payload) {
    if (err) {
      return res.status(401).json({ message: "token problem please login again" })
    }
    if (payload !== undefined) {
      const user = await User.findById(payload.sub, '_id email cartId role').populate("cartId");
      if (!user) return res.status(401).json({ status: "USER_NOT_FOUND", message: "redirect to login page" })
      const cart = await Cart.findById(user?.cartId);
      console.log(user)
      req.user = user;
    }
    next()
  })
}


export const adminVerify = (req: Request, res: Response, next: any) => {
  if (req.cookies.token === undefined) {
    return res.status(401).json({ message: "redirect to login page todo" })
  }
  let token = req.cookies.token.slice(7) || null;

  jwt.verify(token, jwtCert, { algorithms: ['RS256'] }, async function(err, payload) {
    if (err) {
      return res.status(401).json({ message: "token problem please login again" })
    }
    if (payload !== undefined) {
      const user = await User.findById(payload.sub, '_id email cartId role');
      console.log(user)
      if (!user) return res.status(401).json({ status: "NOT_FOUND_USER", message: "redirect to login page" })
      if (user.role.includes("ADMIN")) {
        req.user = user;
        next()
      }
    }
  })
}



