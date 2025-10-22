"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDefaultLanguage = void 0;
const setDefaultLanguage = (req, res, next) => {
    req.headers['accept-language'] = req.headers['accept-language'] ?? "EN";
    next();
};
exports.setDefaultLanguage = setDefaultLanguage;
//# sourceMappingURL=setDefaultLanguage.middleware.js.map