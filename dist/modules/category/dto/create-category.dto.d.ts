import { Types } from "mongoose";
import { ICategory } from "src/common";
export declare class CreateCategoryDto implements Partial<ICategory> {
    name: string;
    description: string;
    brands: Types.ObjectId[];
}
