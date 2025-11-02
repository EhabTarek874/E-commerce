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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const DB_1 = require("../../DB");
const common_2 = require("../../common");
const mongoose_1 = require("mongoose");
const brand_repository_1 = require("./../../DB/repository/brand.repository");
const crypto_1 = require("crypto");
let CategoryService = class CategoryService {
    categoryRepository;
    s3service;
    brandRepository;
    constructor(categoryRepository, s3service, brandRepository) {
        this.categoryRepository = categoryRepository;
        this.s3service = s3service;
        this.brandRepository = brandRepository;
    }
    async create(createCategoryDto, file, user) {
        const { name } = createCategoryDto;
        const checkDuplicated = await this.categoryRepository.findOne({ filter: { name, paranoId: false } });
        if (checkDuplicated) {
            throw new common_1.ConflictException(checkDuplicated.freezedAt ? "Duplicated with archived Category" : "Duplicated Category name");
        }
        let assetFolderId = (0, crypto_1.randomUUID)();
        const image = await this.s3service.uploadFile({ file, path: `${common_2.FolderEnum.Category}/${assetFolderId}` });
        const brands = [...new Set(createCategoryDto.brands || [])];
        if (brands && (await this.brandRepository.find({ filter: { _id: { $in: brands } } })).length != brands.length) {
            throw new common_1.NotFoundException("some of mentioned brands are not exists");
        }
        const [Category] = await this.categoryRepository.create({ data: [{ ...createCategoryDto, image, assetFolderId, createdBy: user._id, brands: brands.map(brand => { return mongoose_1.Types.ObjectId.createFromHexString(brand); }) }] });
        if (!Category) {
            await this.s3service.deleteFile({ Key: image });
            throw new common_1.BadRequestException("Fail to create this Category");
        }
        return Category;
    }
    async update(categoryId, updateCategoryDto, user) {
        const brands = [...new Set(updateCategoryDto.brands || [])];
        if (brands && (await this.brandRepository.find({ filter: { _id: { $in: brands } } })).length != brands.length) {
            throw new common_1.NotFoundException("some of mentioned brands are not exists");
        }
        if (updateCategoryDto.name && await this.categoryRepository.findOne({ filter: { name: updateCategoryDto.name } })) {
            throw new common_1.ConflictException("Duplicated Category name");
        }
        const removeBrands = updateCategoryDto.brands ?? [];
        const category = await this.categoryRepository.findOneAndUpdate({
            filter: { _id: categoryId },
            update: [
                {
                    $set: {
                        ...updateCategoryDto,
                        updatedBy: user._id,
                        brands: {
                            $setUnion: [
                                {
                                    $setDifference: [
                                        "$brands",
                                        (removeBrands || []).map((brand) => {
                                            return mongoose_1.Types.ObjectId.createFromHexString(brand);
                                        })
                                    ]
                                },
                                brands.map((brand) => {
                                    return mongoose_1.Types.ObjectId.createFromHexString(brand);
                                })
                            ]
                        }
                    },
                },
            ],
        });
        if (!category) {
            throw new common_1.BadRequestException("Fail to find matching Category");
        }
        return category;
    }
    async updateAttachment(categoryId, file, user) {
        const category = await this.categoryRepository.findOne({
            filter: { _id: categoryId },
        });
        if (!category) {
            throw new common_1.BadRequestException("Fail to find matching Category");
        }
        const image = await this.s3service.uploadFile({ file, path: ` ${common_2.FolderEnum.Category}/${category.assetFolderId} ` });
        const UpdateCategory = await this.categoryRepository.findOneAndUpdate({
            filter: { _id: categoryId },
            update: {
                image,
                updatedBy: user._id
            },
        });
        if (!UpdateCategory) {
            await this.s3service.deleteFile({ Key: image });
            throw new common_1.NotFoundException("Fail to matching Category ");
        }
        await this.s3service.deleteFile({ Key: category.image });
        return UpdateCategory;
    }
    async freeze(categoryId, user) {
        const category = await this.categoryRepository.findOneAndUpdate({
            filter: { _id: categoryId },
            update: {
                freezedAt: new Date(),
                $unset: { restoredAt: true },
                updatedBy: user._id
            },
            options: {
                new: false
            }
        });
        if (!category) {
            throw new common_1.BadRequestException("Fail to find matching Category");
        }
        return "Done";
    }
    async restore(categoryId, user) {
        const category = await this.categoryRepository.findOneAndUpdate({
            filter: { _id: categoryId, paranoId: false, freezedAt: { $exists: true } },
            update: {
                restoredAt: new Date(),
                $unset: { freezedAt: true },
                updatedBy: user._id
            },
            options: {
                new: false
            }
        });
        if (!category) {
            throw new common_1.BadRequestException("Fail to find matching Category");
        }
        return "Done";
    }
    async remove(categoryId, user) {
        const category = await this.categoryRepository.findOneAndDelete({
            filter: { _id: categoryId, paranoId: false, freezedAt: { $exists: true } },
        });
        if (!category) {
            throw new common_1.BadRequestException("Fail to find matching Category");
        }
        await this.s3service.deleteFile({ Key: category.image });
        return "Done";
    }
    async findAll(data, archive = false) {
        const { page, size, search } = data;
        const result = await this.categoryRepository.paginate({
            filter: {
                ...(search ? {
                    $or: [
                        { name: { $regex: search, $options: "i" } },
                        { slug: { $regex: search, $options: "i" } },
                        { discretion: { $regex: search, $options: "i" } },
                    ]
                } : {}),
                ...(archive ? { paranoId: false, freezedAt: { $exists: true } } : {})
            },
            page, size
        });
        return result;
    }
    async findOne(categoryId, archive = false) {
        const category = await this.categoryRepository.findOne({
            filter: {
                _id: categoryId,
                ...(archive ? { paranoId: false, freezedAt: { $exists: true } } : {})
            },
        });
        if (!category) {
            throw new common_1.NotFoundException("Fail to finds matching Category instance");
        }
        return category;
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [DB_1.CategoryRepository, common_2.S3service, brand_repository_1.BrandRepository])
], CategoryService);
//# sourceMappingURL=category.service.js.map