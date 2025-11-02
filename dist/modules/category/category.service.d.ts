import { CreateCategoryDto } from './dto/create-category.dto';
import { GetAllDto, UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryDocument, CategoryRepository, UserDocument } from 'src/DB';
import { S3service } from 'src/common';
import { Types } from 'mongoose';
import { BrandRepository } from './../../DB/repository/brand.repository';
import { Lean } from 'src/DB/repository/database.repository';
export declare class CategoryService {
    private readonly categoryRepository;
    private readonly s3service;
    private readonly brandRepository;
    constructor(categoryRepository: CategoryRepository, s3service: S3service, brandRepository: BrandRepository);
    create(createCategoryDto: CreateCategoryDto, file: Express.Multer.File, user: UserDocument): Promise<CategoryDocument>;
    update(categoryId: Types.ObjectId, updateCategoryDto: UpdateCategoryDto, user: UserDocument): Promise<CategoryDocument | Lean<CategoryDocument>>;
    updateAttachment(categoryId: Types.ObjectId, file: Express.Multer.File, user: UserDocument): Promise<CategoryDocument | Lean<CategoryDocument>>;
    freeze(categoryId: Types.ObjectId, user: UserDocument): Promise<string>;
    restore(categoryId: Types.ObjectId, user: UserDocument): Promise<string>;
    remove(categoryId: Types.ObjectId, user: UserDocument): Promise<string>;
    findAll(data: GetAllDto, archive?: boolean): Promise<any>;
    findOne(categoryId: Types.ObjectId, archive?: boolean): Promise<CategoryDocument | Lean<CategoryDocument>>;
}
