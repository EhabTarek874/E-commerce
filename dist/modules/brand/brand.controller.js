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
exports.BrandController = void 0;
const common_1 = require("@nestjs/common");
const brand_service_1 = require("./brand.service");
const create_brand_dto_1 = require("./dto/create-brand.dto");
const common_2 = require("../../common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("../../common/utils/multer");
const authorization_module_1 = require("./authorization.module");
const update_brand_dto_1 = require("./dto/update-brand.dto");
let BrandController = class BrandController {
    brandService;
    constructor(brandService) {
        this.brandService = brandService;
    }
    async create(user, createBrandDto, file) {
        const brand = await this.brandService.create(createBrandDto, file, user);
        return (0, common_2.successResponse)({ status: 201, data: { brand } });
    }
    async update(params, string, updateBrandDto, user) {
        const brand = await this.brandService.update(params.brandId, updateBrandDto, user);
        return (0, common_2.successResponse)({ data: { brand } });
    }
    async updateAttachment(params, file, user) {
        const brand = await this.brandService.updateAttachment(params.brandId, file, user);
        return (0, common_2.successResponse)({ data: { brand } });
    }
    async freeze(params, user) {
        await this.brandService.freeze(params.brandId, user);
        return (0, common_2.successResponse)();
    }
    async restore(params, user) {
        await this.brandService.restore(params.brandId, user);
        return (0, common_2.successResponse)();
    }
    async remove(params, user) {
        await this.brandService.remove(params.brandId, user);
        return (0, common_2.successResponse)();
    }
    async findAll(query) {
        const result = await this.brandService.findAll(query);
        return (0, common_2.successResponse)({ data: { result } });
    }
    async findAllArchive(query) {
        const result = await this.brandService.findAll(query, true);
        return (0, common_2.successResponse)({ data: { result } });
    }
    async findOne(params, string) {
        const brand = await this.brandService.findOne(params.brandId);
        return (0, common_2.successResponse)({ data: { brand } });
    }
    async findOneArchive(params, string) {
        const brand = await this.brandService.findOne(params.brandId, true);
        return (0, common_2.successResponse)({ data: { brand } });
    }
};
exports.BrandController = BrandController;
__decorate([
    (0, common_2.Auth)(authorization_module_1.endpoint.create),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("attachment", (0, multer_1.cloudFileUpload)({ validation: multer_1.fileValidation.image }))),
    (0, common_1.Post)(),
    __param(0, (0, common_2.User)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(common_1.ParseFilePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_brand_dto_1.CreateBrandDto, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "create", null);
__decorate([
    (0, common_2.Auth)(authorization_module_1.endpoint.create),
    (0, common_1.Patch)(':brandId'),
    __param(0, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_2.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_brand_dto_1.BrandParamsDto, Object, update_brand_dto_1.UpdateBrandDto, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "update", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("attachment", (0, multer_1.cloudFileUpload)({ validation: multer_1.fileValidation.image }))),
    (0, common_2.Auth)(authorization_module_1.endpoint.create),
    (0, common_1.Patch)(':brandId/attachment'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.UploadedFile)(common_1.ParseFilePipe)),
    __param(2, (0, common_2.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_brand_dto_1.BrandParamsDto, Object, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "updateAttachment", null);
__decorate([
    (0, common_2.Auth)(authorization_module_1.endpoint.create),
    (0, common_1.Delete)(':brandId/freeze'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_brand_dto_1.BrandParamsDto, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "freeze", null);
__decorate([
    (0, common_2.Auth)(authorization_module_1.endpoint.create),
    (0, common_1.Patch)(':brandId/restore'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_brand_dto_1.BrandParamsDto, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "restore", null);
__decorate([
    (0, common_2.Auth)(authorization_module_1.endpoint.create),
    (0, common_1.Delete)(':brandId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_brand_dto_1.BrandParamsDto, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_brand_dto_1.GetAllDto]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "findAll", null);
__decorate([
    (0, common_2.Auth)(authorization_module_1.endpoint.create),
    (0, common_1.Get)('/archive'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_brand_dto_1.GetAllDto]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "findAllArchive", null);
__decorate([
    (0, common_1.Get)(':brandId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_brand_dto_1.BrandParamsDto, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "findOne", null);
__decorate([
    (0, common_2.Auth)(authorization_module_1.endpoint.create),
    (0, common_1.Get)(':brandId/archive'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_brand_dto_1.BrandParamsDto, Object]),
    __metadata("design:returntype", Promise)
], BrandController.prototype, "findOneArchive", null);
exports.BrandController = BrandController = __decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, common_1.Controller)('brand'),
    __metadata("design:paramtypes", [brand_service_1.BrandService])
], BrandController);
//# sourceMappingURL=brand.controller.js.map