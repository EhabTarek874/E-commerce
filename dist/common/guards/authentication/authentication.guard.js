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
exports.AuthenticationGuard = void 0;
const common_1 = require("@nestjs/common");
const token_service_1 = require("./../../service/token.service");
const core_1 = require("@nestjs/core");
const decorators_1 = require("../../decorators");
let AuthenticationGuard = class AuthenticationGuard {
    tokenService;
    reflector;
    constructor(tokenService, reflector) {
        this.tokenService = tokenService;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const tokenType = this.reflector.getAllAndOverride(decorators_1.tokenName, [context.getHandler()]);
        console.log({ context, tokenType });
        let req;
        let authorization = ' ';
        switch (context.getType()) {
            case 'http':
                const HttpCtx = context.switchToHttp();
                req = HttpCtx.getRequest();
                authorization = req.headers.authorization;
                break;
                break;
            default:
                break;
        }
        const { decoded, user } = await this.tokenService.decodedToken({
            authorization,
            tokenType,
        });
        req.credentials = { decoded, user };
        return true;
    }
};
exports.AuthenticationGuard = AuthenticationGuard;
exports.AuthenticationGuard = AuthenticationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [token_service_1.TokenService,
        core_1.Reflector])
], AuthenticationGuard);
//# sourceMappingURL=authentication.guard.js.map