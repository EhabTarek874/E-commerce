"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreAuth = void 0;
const common_1 = require("@nestjs/common");
const PreAuth = async (req, res, next) => {
    if (req.headers.authorization?.split(" ")?.length !== 2) {
        throw new common_1.BadRequestException("Missing authorization key");
    }
    next();
};
exports.PreAuth = PreAuth;
//# sourceMappingURL=authentication.middleware.js.map