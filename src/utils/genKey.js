"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_crypto_1 = require("node:crypto");
var fs = require("fs");
var _a = (0, node_crypto_1.generateKeyPairSync)('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'pkcs1', // "Public Key Cryptography Standards 1" 
        format: 'pem' // Most common formatting choice
    },
    privateKeyEncoding: {
        type: 'pkcs1', // "Public Key Cryptography Standards 1"
        format: 'pem' // Most common formatting choice
    }
}), privateKey = _a.privateKey, publicKey = _a.publicKey;
console.log(publicKey);
fs.writeFileSync(__dirname + "/res_pub.pem", publicKey);
fs.writeFileSync(__dirname + "/res_priv.pem", privateKey);
