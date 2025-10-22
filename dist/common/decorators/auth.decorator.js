"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const common_1 = require("@nestjs/common");
const enums_1 = require("../enums");
const tokenType_decorator_1 = require("./tokenType.decorator");
const role_decorators_1 = require("./role.decorators");
const authentication_guard_1 = require("../guards/authentication/authentication.guard");
const authorization_guard_1 = require("../guards/authorization/authorization.guard");
function Auth(roles, type = enums_1.TokenEnum.access) {
    return (0, common_1.applyDecorators)((0, tokenType_decorator_1.Token)(type), (0, role_decorators_1.Roles)(roles), (0, common_1.UseGuards)(authentication_guard_1.AuthenticationGuard, authorization_guard_1.AuthorizationGuard));
}
//# sourceMappingURL=auth.decorator.js.map