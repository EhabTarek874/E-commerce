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
exports.BrandService = void 0;
const common_1 = require("@nestjs/common");
const brand_repository_1 = require("./../../DB/repository/brand.repository");
const s3_service_1 = require("./../../common/service/s3.service");
const common_2 = require("../../common");
let BrandService = class BrandService {
    brandRepository;
    s3service;
    constructor(brandRepository, s3service) {
        this.brandRepository = brandRepository;
        this.s3service = s3service;
    }
    async create(createBrandDto, file, user) {
        const { name, slogan } = createBrandDto;
        const checkDuplicated = await this.brandRepository.findOne({ filter: { name, paranoId: false } });
        if (checkDuplicated) {
            throw new common_1.ConflictException(checkDuplicated.freezedAt ? "Duplicated with archived brand" : "Duplicated brand name");
        }
        const image = await this.s3service.uploadFile({ file, path: `Brand` });
        const [brand] = await this.brandRepository.create({ data: [{ name, slogan, image, createdBy: user._id }] });
        if (!brand) {
            await this.s3service.deleteFile({ Key: image });
            throw new common_1.BadRequestException("Fail to create this brand");
        }
        return brand;
    }
    async update(brandId, updateBrandDto, user) {
        if (updateBrandDto.name && await this.brandRepository.findOne({ filter: { name: updateBrandDto.name } })) {
            throw new common_1.ConflictException("Duplicated brand name");
        }
        const brand = await this.brandRepository.findOneAndUpdate({
            filter: { _id: brandId },
            update: {
                ...updateBrandDto,
                updatedBy: user._id
            }
        });
        if (!brand) {
            throw new common_1.BadRequestException("Fail to find matching brand");
        }
        return brand;
    }
    async updateAttachment(brandId, file, user) {
        const image = await this.s3service.uploadFile({ file, path: common_2.FolderEnum.Brand });
        const brand = await this.brandRepository.findOneAndUpdate({
            filter: { _id: brandId },
            update: {
                image,
                updatedBy: user._id
            },
            options: {
                new: false
            }
        });
        if (!brand) {
            await this.s3service.deleteFile({ Key: image });
            throw new common_1.BadRequestException("Fail to find matching brand");
        }
        await this.s3service.deleteFile({ Key: brand.image });
        brand.image = image;
        return brand;
    }
    async freeze(brandId, user) {
        const brand = await this.brandRepository.findOneAndUpdate({
            filter: { _id: brandId },
            update: {
                freezedAt: new Date(),
                $unset: { restoredAt: true },
                updatedBy: user._id
            },
            options: {
                new: false
            }
        });
        if (!brand) {
            throw new common_1.BadRequestException("Fail to find matching brand");
        }
        return "Done";
    }
    async restore(brandId, user) {
        const brand = await this.brandRepository.findOneAndUpdate({
            filter: { _id: brandId, paranoId: false, freezedAt: { $exits: true } },
            update: {
                restoredAt: new Date(),
                $unset: { freezedAt: true },
                updatedBy: user._id
            },
            options: {
                new: false
            }
        });
        if (!brand) {
            throw new common_1.BadRequestException("Fail to find matching brand");
        }
        return "Done";
    }
    async remove(brandId, user) {
        const brand = await this.brandRepository.findOneAndDelete({
            filter: { _id: brandId, paranoId: false, freezedAt: { $exists: true } },
        });
        if (!brand) {
            throw new common_1.BadRequestException("Fail to find matching brand");
        }
        await this.s3service.deleteFile({ Key: brand.image });
        return "Done";
    }
    async findAll(data, archive = false) {
        const { page, size, search } = data;
        const result = await this.brandRepository.paginate({
            filter: {
                ...(search ? {
                    $or: [
                        { name: { $regex: search, $options: "i" } },
                        { slug: { $regex: search, $options: "i" } },
                        { slogan: { $regex: search, $options: "i" } },
                    ]
                } : {}),
                ...(archive ? { paranoId: false, freezedAt: { $exists: true } } : {})
            },
            page, size
        });
        return result;
    }
    async findOne(brandId, archive = false) {
        const brand = await this.brandRepository.findOne({
            filter: {
                _id: brandId,
                ...(archive ? { paranoId: false, freezedAt: { $exists: true } } : {})
            },
        });
        if (!brand) {
            throw new common_1.NotFoundException("Fail to finds matching brand instance");
        }
        return brand;
    }
};
exports.BrandService = BrandService;
exports.BrandService = BrandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [brand_repository_1.BrandRepository, s3_service_1.S3service])
], BrandService);
//# sourceMappingURL=brand.service.js.map