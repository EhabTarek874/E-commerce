"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNumericalOtp = void 0;
const createNumericalOtp = () => {
    return String(Math.floor(Math.random() * (999999 - 100000 + 1) + 100000));
};
exports.createNumericalOtp = createNumericalOtp;
//# sourceMappingURL=otp.js.map