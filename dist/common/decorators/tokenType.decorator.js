"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.tokenName = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../enums");
exports.tokenName = "tokenType";
const Token = (type = enums_1.TokenEnum.access) => {
    return (0, common_1.SetMetadata)(exports.tokenName, type);
};
exports.Token = Token;
//# sourceMappingURL=tokenType.decorator.js.map