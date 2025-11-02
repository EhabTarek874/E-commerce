import { HydratedDocument, Types } from "mongoose";
import { IBrand } from "src/common";
export declare class Brand implements IBrand {
    name: string;
    slug: string;
    slogan: string;
    image: string;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
    freezedAt: Date;
    restoredAt: Date;
}
export type BrandDocument = HydratedDocument<Brand>;
export declare const BrandModel: import("@nestjs/common").DynamicModule;
