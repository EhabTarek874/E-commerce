"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
const authentication_middleware_1 = require("../../common/interfaces/authentication.middleware");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("../../common");
let UserModule = class UserModule {
    configure(consumer) {
        consumer
            .apply(authentication_middleware_1.PreAuth)
            .forRoutes(user_controller_1.UserController);
    }
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [platform_express_1.MulterModule.register({})],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, common_2.S3service],
        exports: [],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map