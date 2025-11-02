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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const s3_service_1 = require("./common/service/s3.service");
let AppController = class AppController {
    appService;
    s3service;
    constructor(appService, s3service) {
        this.appService = appService;
        this.s3service = s3service;
    }
    getHello() {
        return this.appService.getHello();
    }
    sayHi() {
        return "Hi";
    }
    async getPresignedAssetUrl(query, params) {
        const { download, filename } = query;
        const { path } = params;
        const key = path.join("/");
        const url = await this.s3service.createPreSignedUploadLink({ key, download, filename, });
        return ({ message: "Done", data: { url } });
    }
    async getAsset(query, params, res) {
        const { download, filename } = query;
        const { path } = params;
        const Key = path.join('/');
        const s3Response = await this.s3service.getFile({ Key });
        if (!s3Response?.Body) {
            throw new common_1.BadRequestException('Fail to fetch this asset');
        }
        res.set('Cross-Origin-Resource-Policy', 'cross-origin');
        res.setHeader('Content-Type', `${s3Response.ContentType}`);
        if (download === 'true') {
            res.setHeader('Content-Disposition', `attachment; filename="${filename || Key.split('/').pop()}"`);
        }
        return await s3Response.Body.transformToByteArray();
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "getHello", null);
__decorate([
    (0, common_1.Get)('hi'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppController.prototype, "sayHi", null);
__decorate([
    (0, common_1.Get)('/upload/pre-signed/*path'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getPresignedAssetUrl", null);
__decorate([
    (0, common_1.Get)('/upload/*path'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getAsset", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService, s3_service_1.S3service])
], AppController);
//# sourceMappingURL=app.controller.js.map