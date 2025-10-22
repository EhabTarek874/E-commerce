"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const user_module_1 = require("./modules/user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const common_2 = require("./common");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: (0, path_1.resolve)('./config/.env.development'), isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.DB_URI, { serverSelectionTimeoutMS: 30000 }),
            common_2.SharedAuthenticationModule,
            auth_module_1.AuthenticationModule,
            user_module_1.UserModule
        ],
        controllers: [app_controller_1.AppController,],
        providers: [app_service_1.AppService,],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map