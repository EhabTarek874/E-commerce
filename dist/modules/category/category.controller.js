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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("../../common/utils/multer");
const common_2 = require("../../common");
const category_authorization_1 = require("./category.authorization");
let CategoryController = class CategoryController {
    categoryService;
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    async create(user, createCategoryDto, file) {
        const category = await this.categoryService.create(createCategoryDto, file, user);
        return (0, common_2.successResponse)({ status: 201, data: { category } });
    }
    async update(params, string, updateCategoryDto, user) {
        const category = await this.categoryService.update(params.categoryId, updateCategoryDto, user);
        return (0, common_2.successResponse)({ data: { category } });
    }
    async updateAttachment(params, file, user) {
        const category = await this.categoryService.updateAttachment(params.categoryId, file, user);
        return (0, common_2.successResponse)({ data: { category } });
    }
    async freeze(params, user) {
        await this.categoryService.freeze(params.categoryId, user);
        return (0, common_2.successResponse)();
    }
    async restore(params, user) {
        await this.categoryService.restore(params.categoryId, user);
        return (0, common_2.successResponse)();
    }
    async remove(params, user) {
        await this.categoryService.remove(params.categoryId, user);
        return (0, common_2.successResponse)();
    }
    async findAll(query) {
        const result = await this.categoryService.findAll(query);
        return (0, common_2.successResponse)({ data: { result } });
    }
    async findAllArchive(query) {
        const result = await this.categoryService.findAll(query, true);
        return (0, common_2.successResponse)({ data: { result } });
    }
    async findOne(params, string) {
        const category = await this.categoryService.findOne(params.categoryId);
        return (0, common_2.successResponse)({ data: { category } });
    }
    async findOneArchive(params, string) {
        const category = await this.categoryService.findOne(params.categoryId, true);
        return (0, common_2.successResponse)({ data: { category } });
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("attachment", (0, multer_1.cloudFileUpload)({ validation: multer_1.fileValidation.image }))),
    (0, common_2.Auth)(category_authorization_1.endpoint.create),
    (0, common_1.Post)(),
    __param(0, (0, common_2.User)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)(common_1.ParseFilePipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_category_dto_1.CreateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "create", null);
__decorate([
    (0, common_2.Auth)(category_authorization_1.endpoint.create),
    (0, common_1.Patch)(':categoryId'),
    __param(0, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_2.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_dto_1.CategoryParamsDto, Object, update_category_dto_1.UpdateCategoryDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "update", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("attachment", (0, multer_1.cloudFileUpload)({ validation: multer_1.fileValidation.image }))),
    (0, common_2.Auth)(category_authorization_1.endpoint.create),
    (0, common_1.Patch)(':categoryId/attachment'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.UploadedFile)(common_1.ParseFilePipe)),
    __param(2, (0, common_2.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_dto_1.CategoryParamsDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "updateAttachment", null);
__decorate([
    (0, common_2.Auth)(category_authorization_1.endpoint.create),
    (0, common_1.Delete)(':categoryId/freeze'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_dto_1.CategoryParamsDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "freeze", null);
__decorate([
    (0, common_2.Auth)(category_authorization_1.endpoint.create),
    (0, common_1.Patch)(':categoryId/restore'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_dto_1.CategoryParamsDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "restore", null);
__decorate([
    (0, common_2.Auth)(category_authorization_1.endpoint.create),
    (0, common_1.Delete)(':categoryId'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_2.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_dto_1.CategoryParamsDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_dto_1.GetAllDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAll", null);
__decorate([
    (0, common_2.Auth)(category_authorization_1.endpoint.create),
    (0, common_1.Get)('/archive'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_dto_1.GetAllDto]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findAllArchive", null);
__decorate([
    (0, common_1.Get)(':categoryId'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_dto_1.CategoryParamsDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findOne", null);
__decorate([
    (0, common_2.Auth)(category_authorization_1.endpoint.create),
    (0, common_1.Get)(':categoryId/archive'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_category_dto_1.CategoryParamsDto, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "findOneArchive", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })),
    (0, common_1.Controller)('category'),
    __metadata("design:paramtypes", [category_service_1.CategoryService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map