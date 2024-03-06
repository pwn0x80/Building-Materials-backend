import {generateKeyPairSync} from "node:crypto";
import * as fs from "fs";
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,
 publicKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1" 
            format: 'pem' // Most common formatting choice
        },
        privateKeyEncoding: {
            type: 'pkcs1', // "Public Key Cryptography Standards 1"
            format: 'pem' // Most common formatting choice
        }
});
console.log(publicKey)
fs.writeFileSync(__dirname+"/res_pub.pem", publicKey)
fs.writeFileSync(__dirname+"/res_priv.pem",privateKey)
