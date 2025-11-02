"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successResponse = void 0;
const successResponse = ({ data, message = "Done", status = 200 } = {}) => {
    return { message, status, data };
};
exports.successResponse = successResponse;
//# sourceMappingURL=response.js.map