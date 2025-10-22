"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.generateHash = void 0;
const bcrypt_1 = require("bcrypt");
const generateHash = async (plaintext, salt_round = parseInt(process.env.SALT)) => {
    return await (0, bcrypt_1.hash)(plaintext, salt_round);
};
exports.generateHash = generateHash;
const compareHash = async (plaintext, hashValue) => {
    return await (0, bcrypt_1.compare)(plaintext, hashValue);
};
exports.compareHash = compareHash;
//# sourceMappingURL=hash.security.js.map