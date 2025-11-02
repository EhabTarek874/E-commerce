import { DatabaseRepository } from "./database.repository";
import { Category, CategoryDocument as TDocument } from "../model";
import { Model } from "mongoose";
export declare class CategoryRepository extends DatabaseRepository<Category> {
    protected readonly model: Model<TDocument>;
    constructor(model: Model<TDocument>);
}
