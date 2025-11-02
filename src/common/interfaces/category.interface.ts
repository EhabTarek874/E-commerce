import { Types } from "mongoose";
import { IUser } from "./user.interface";
import { IBrand } from "./brand.interface";

export interface ICategory {
    _id?: Types.ObjectId;

    name: string;
    slogan?:string;
    slug: string;
    discretion?: string;
    image:string;
    assetFolderId:string;
    createdBy: Types.ObjectId | IUser;
    updatedBy?: Types.ObjectId | IUser;

    brands?:Types.ObjectId[] | IBrand[];





    createdAt?: Date;
    updatedAt?: Date;
    freezedAt?: Date;
    restoredAt?: Date;
}