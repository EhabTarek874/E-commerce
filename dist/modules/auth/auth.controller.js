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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const signup_dto_1 = require("./dto/signup.dto");
const common_2 = require("../../common");
let AuthenticationController = class AuthenticationController {
    authenticationService;
    constructor(authenticationService) {
        this.authenticationService = authenticationService;
    }
    async signup(body) {
        await this.authenticationService.signup(body);
        return (0, common_2.successResponse)();
    }
    async resendConfirmEmail(body) {
        await this.authenticationService.resendConfirmEmail(body);
        return (0, common_2.successResponse)();
    }
    async ConfirmEmail(body) {
        await this.authenticationService.confirmEmail(body);
        return (0, common_2.successResponse)();
    }
    async login(body) {
        const credentials = await this.authenticationService.login(body);
        return (0, common_2.successResponse)({ message: "Done", data: { credentials } });
    }
};
exports.AuthenticationController = AuthenticationController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('resend-confirm-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.ResendConfirmEmailDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "resendConfirmEmail", null);
__decorate([
    (0, common_1.Patch)('confirm-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.ConfirmEmailDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "ConfirmEmail", null);
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.LoginBodyDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "login", null);
exports.AuthenticationController = AuthenticationController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthenticationService])
], AuthenticationController);
//# sourceMappingURL=auth.controller.js.map