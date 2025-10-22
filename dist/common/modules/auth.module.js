"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedAuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const DB_1 = require("../../DB");
const jwt_1 = require("@nestjs/jwt");
const token_service_1 = require("../service/token.service");
let SharedAuthenticationModule = class SharedAuthenticationModule {
};
exports.SharedAuthenticationModule = SharedAuthenticationModule;
exports.SharedAuthenticationModule = SharedAuthenticationModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [DB_1.UserModel, DB_1.TokenModel],
        providers: [
            DB_1.UserRepository,
            jwt_1.JwtService,
            token_service_1.TokenService,
            DB_1.TokenRepository,
        ],
        controllers: [],
        exports: [
            token_service_1.TokenService,
            DB_1.UserRepository,
            jwt_1.JwtService,
            DB_1.TokenRepository,
            DB_1.TokenModel,
            DB_1.UserModel,
        ],
    })
], SharedAuthenticationModule);
//# sourceMappingURL=auth.module.js.map