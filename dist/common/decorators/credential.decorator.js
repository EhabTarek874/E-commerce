"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
exports.User = (0, common_1.createParamDecorator)((data, context) => {
    let req;
    switch (context.getType()) {
        case 'http':
            req = context.switchToHttp().getRequest();
            break;
            break;
        default:
            break;
    }
    return req.credentials.user;
});
//# sourceMappingURL=credential.decorator.js.map