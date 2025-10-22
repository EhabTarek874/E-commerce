"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const role_decorators_1 = require("../../decorators/role.decorators");
const enums_1 = require("../../enums");
let AuthorizationGuard = class AuthorizationGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const accessRoles = this.reflector.getAllAndOverride(role_decorators_1.roleName, [context.getHandler()]) ?? [];
        console.log({ context, accessRoles });
        let role = enums_1.RoleEnum.user;
        switch (context.getType()) {
            case 'http':
                role = context.switchToHttp().getRequest().credentials.user.role;
                break;
                break;
            default:
                break;
        }
        return accessRoles.includes(role);
    }
};
exports.AuthorizationGuard = AuthorizationGuard;
exports.AuthorizationGuard = AuthorizationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], AuthorizationGuard);
//# sourceMappingURL=authorization.guard.js.map