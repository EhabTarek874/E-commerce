"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreferredLanguageInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let PreferredLanguageInterceptor = class PreferredLanguageInterceptor {
    intercept(context, next) {
        context.switchToHttp().getRequest().headers['accept-language'] = context
            .switchToHttp()
            .getRequest().credentials.user.preferredLanguage ?? context.switchToHttp().getRequest().headers['accept-language'];
        return next
            .handle()
            .pipe((0, operators_1.tap)(() => console.log("Done")));
    }
};
exports.PreferredLanguageInterceptor = PreferredLanguageInterceptor;
exports.PreferredLanguageInterceptor = PreferredLanguageInterceptor = __decorate([
    (0, common_1.Injectable)()
], PreferredLanguageInterceptor);
//# sourceMappingURL=applyLanguage.interceptor.js.map