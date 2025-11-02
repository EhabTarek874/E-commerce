import { HydratedDocument, Types } from "mongoose";
import { ICategory } from "src/common";
export declare class Category implements ICategory {
    name: string;
    slug: string;
    slogan?: string;
    image: string;
    assetFolderId: string;
    discretion?: string | undefined;
    createdBy: Types.ObjectId;
    updatedBy: Types.ObjectId;
    freezedAt: Date;
    restoredAt: Date;
    brands?: Types.ObjectId[];
}
export type CategoryDocument = HydratedDocument<Category>;
export declare const CategoryModel: import("@nestjs/common").DynamicModule;
