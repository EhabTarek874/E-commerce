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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllDto = exports.CategoryParamsDto = exports.UpdateCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const common_1 = require("../../../common");
const class_transformer_1 = require("class-transformer");
const create_category_dto_1 = require("./create-category.dto");
let UpdateCategoryDto = class UpdateCategoryDto extends (0, mapped_types_1.PartialType)(create_category_dto_1.CreateCategoryDto) {
    removeBrands;
};
exports.UpdateCategoryDto = UpdateCategoryDto;
__decorate([
    (0, class_validator_1.Validate)(common_1.MongoDBIds),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateCategoryDto.prototype, "removeBrands", void 0);
exports.UpdateCategoryDto = UpdateCategoryDto = __decorate([
    (0, common_1.ContainField)()
], UpdateCategoryDto);
class CategoryParamsDto {
    categoryId;
}
exports.CategoryParamsDto = CategoryParamsDto;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CategoryParamsDto.prototype, "categoryId", void 0);
class GetAllDto {
    page;
    size;
    search;
}
exports.GetAllDto = GetAllDto;
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllDto.prototype, "page", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], GetAllDto.prototype, "size", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], GetAllDto.prototype, "search", void 0);
//# sourceMappingURL=update-category.dto.js.map