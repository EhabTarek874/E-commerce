import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { IResponse } from 'src/common';
import type { UserDocument } from 'src/DB';
import { BrandResponse } from './entities/brand.entity';
import { BrandParamsDto, GetAllDto, UpdateBrandDto } from './dto/update-brand.dto';
export declare class BrandController {
    private readonly brandService;
    constructor(brandService: BrandService);
    create(user: UserDocument, createBrandDto: CreateBrandDto, file: Express.Multer.File): Promise<IResponse<BrandResponse>>;
    update(params: BrandParamsDto, string: any, updateBrandDto: UpdateBrandDto, user: UserDocument): Promise<IResponse<BrandResponse>>;
    updateAttachment(params: BrandParamsDto, file: Express.Multer.File, user: UserDocument): Promise<IResponse<BrandResponse>>;
    freeze(params: BrandParamsDto, user: UserDocument): Promise<IResponse>;
    restore(params: BrandParamsDto, user: UserDocument): Promise<IResponse>;
    remove(params: BrandParamsDto, user: UserDocument): Promise<IResponse<any>>;
    findAll(query: GetAllDto): Promise<IResponse<{
        result: any;
    }>>;
    findAllArchive(query: GetAllDto): Promise<IResponse<{
        result: any;
    }>>;
    findOne(params: BrandParamsDto, string: any): Promise<IResponse<BrandResponse>>;
    findOneArchive(params: BrandParamsDto, string: any): Promise<IResponse<BrandResponse>>;
}
