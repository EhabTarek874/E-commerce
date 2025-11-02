import { CreateBrandDto } from './dto/create-brand.dto';
import { BrandRepository } from './../../DB/repository/brand.repository';
import { BrandDocument, UserDocument } from 'src/DB';
import { S3service } from './../../common/service/s3.service';
import { GetAllDto, UpdateBrandDto } from './dto/update-brand.dto';
import { Types } from 'mongoose';
import { Lean } from 'src/DB/repository/database.repository';
export declare class BrandService {
    private readonly brandRepository;
    private readonly s3service;
    constructor(brandRepository: BrandRepository, s3service: S3service);
    create(createBrandDto: CreateBrandDto, file: Express.Multer.File, user: UserDocument): Promise<BrandDocument>;
    update(brandId: Types.ObjectId, updateBrandDto: UpdateBrandDto, user: UserDocument): Promise<BrandDocument | Lean<BrandDocument>>;
    updateAttachment(brandId: Types.ObjectId, file: Express.Multer.File, user: UserDocument): Promise<BrandDocument | Lean<BrandDocument>>;
    freeze(brandId: Types.ObjectId, user: UserDocument): Promise<string>;
    restore(brandId: Types.ObjectId, user: UserDocument): Promise<string>;
    remove(brandId: Types.ObjectId, user: UserDocument): Promise<string>;
    findAll(data: GetAllDto, archive?: boolean): Promise<any>;
    findOne(brandId: Types.ObjectId, archive?: boolean): Promise<BrandDocument | Lean<BrandDocument>>;
}
