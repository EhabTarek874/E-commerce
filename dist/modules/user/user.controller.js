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
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("../../common/utils/multer");
let UserController = class UserController {
    userService;
    constructor(userService) {
        this.userService = userService;
    }
    async profileImage(user, file) {
        const profile = await this.userService.profileImage(file, user);
        return (0, common_2.successResponse)({ data: { profile } });
    }
    coverImage(files) {
        return { message: 'Done', files };
    }
    image(files) {
        return { message: 'Done', files };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profileImage', (0, multer_1.cloudFileUpload)({
        storageApproach: common_2.StorageEnum.disk,
        validation: multer_1.fileValidation.image,
        fileSize: 2,
    }))),
    (0, auth_decorator_1.Auth)([common_2.RoleEnum.user]),
    (0, common_1.Patch)('profile-image'),
    __param(0, (0, common_2.User)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [new common_1.MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 })],
        fileIsRequired: true,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "profileImage", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)((0, multer_1.localFileUpload)({
        folder: 'User',
        validation: multer_1.fileValidation.image,
        fileSize: 2,
    }))),
    (0, auth_decorator_1.Auth)([common_2.RoleEnum.user]),
    (0, common_1.Patch)('cover-image'),
    __param(0, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        validators: [new common_1.MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 })],
        fileIsRequired: true,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "coverImage", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'profileImage', maxCount: 1 },
        { name: 'coverImages', maxCount: 2 },
    ], (0, multer_1.localFileUpload)({
        folder: 'User',
        validation: multer_1.fileValidation.image,
        fileSize: 2,
    }))),
    (0, auth_decorator_1.Auth)([common_2.RoleEnum.user]),
    (0, common_1.Patch)('image'),
    __param(0, (0, common_1.UploadedFiles)(new common_1.ParseFilePipe({
        fileIsRequired: true,
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "image", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map