import { CreateBrandDto } from './create-brand.dto';
import { Types } from "mongoose";
declare const UpdateBrandDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBrandDto>>;
export declare class UpdateBrandDto extends UpdateBrandDto_base {
}
export declare class BrandParamsDto {
    brandId: Types.ObjectId;
}
export declare class GetAllDto {
    page: number;
    size: number;
    search: string;
}
export {};
