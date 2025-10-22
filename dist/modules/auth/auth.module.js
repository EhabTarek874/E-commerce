"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const DB_1 = require("../../DB");
const common_2 = require("../../common");
let AuthenticationModule = class AuthenticationModule {
};
exports.AuthenticationModule = AuthenticationModule;
exports.AuthenticationModule = AuthenticationModule = __decorate([
    (0, common_1.Module)({
        imports: [DB_1.OtpModel],
        providers: [auth_service_1.AuthenticationService, DB_1.OtpRepository, common_2.SecurityService],
        controllers: [auth_controller_1.AuthenticationController],
        exports: [auth_service_1.AuthenticationService]
    })
], AuthenticationModule);
//# sourceMappingURL=auth.module.js.map