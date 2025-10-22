"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageEnum = exports.GenderEnum = exports.RoleEnum = exports.ProviderEnum = void 0;
var ProviderEnum;
(function (ProviderEnum) {
    ProviderEnum["SYSTEM"] = "SYSTEM";
    ProviderEnum["GOOGLE"] = "GOOGLE";
})(ProviderEnum || (exports.ProviderEnum = ProviderEnum = {}));
var RoleEnum;
(function (RoleEnum) {
    RoleEnum["admin"] = "admin";
    RoleEnum["superAdmin"] = "super_admin";
    RoleEnum["user"] = "user";
})(RoleEnum || (exports.RoleEnum = RoleEnum = {}));
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["male"] = "male";
    GenderEnum["female"] = "female";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));
var LanguageEnum;
(function (LanguageEnum) {
    LanguageEnum["AR"] = "AR";
    LanguageEnum["EN"] = "EN";
})(LanguageEnum || (exports.LanguageEnum = LanguageEnum = {}));
//# sourceMappingURL=user.enum.js.map