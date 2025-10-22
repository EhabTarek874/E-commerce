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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const common_2 = require("../../common");
const auth_decorator_1 = require("../../common/decorators/auth.decorator");
const interceptors_1 = require("../../common/interceptors");
const rxjs_1 = require("rxjs");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    profile(header, user) {
        return (0, rxjs_1.of)([{ message: 'Done' }]).pipe((0, rxjs_1.delay)(300));
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseInterceptors)(interceptors_1.PreferredLanguageInterceptor),
    (0, auth_decorator_1.Auth)([common_2.RoleEnum.admin, common_2.RoleEnum.user]),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)()),
    __param(1, (0, common_2.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UserController.prototype, "profile", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map