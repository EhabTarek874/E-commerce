import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryParamsDto, GetAllDto, UpdateCategoryDto } from './dto/update-category.dto';
import { IResponse } from 'src/common';
import { CategoryResponse } from './entities/category.entity';
import type { UserDocument } from 'src/DB';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(user: UserDocument, createCategoryDto: CreateCategoryDto, file: Express.Multer.File): Promise<IResponse<CategoryResponse>>;
    update(params: CategoryParamsDto, string: any, updateCategoryDto: UpdateCategoryDto, user: UserDocument): Promise<IResponse<CategoryResponse>>;
    updateAttachment(params: CategoryParamsDto, file: Express.Multer.File, user: UserDocument): Promise<IResponse<CategoryResponse>>;
    freeze(params: CategoryParamsDto, user: UserDocument): Promise<IResponse>;
    restore(params: CategoryParamsDto, user: UserDocument): Promise<IResponse>;
    remove(params: CategoryParamsDto, user: UserDocument): Promise<IResponse<any>>;
    findAll(query: GetAllDto): Promise<IResponse<{
        result: any;
    }>>;
    findAllArchive(query: GetAllDto): Promise<IResponse<{
        result: any;
    }>>;
    findOne(params: CategoryParamsDto, string: any): Promise<IResponse<CategoryResponse>>;
    findOneArchive(params: CategoryParamsDto, string: any): Promise<IResponse<CategoryResponse>>;
}
