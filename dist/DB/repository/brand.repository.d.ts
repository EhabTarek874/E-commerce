import { DatabaseRepository } from "./database.repository";
import { Brand, BrandDocument as TDocument } from "../model";
import { Model } from "mongoose";
export declare class BrandRepository extends DatabaseRepository<Brand> {
    protected readonly model: Model<TDocument>;
    constructor(model: Model<TDocument>);
}
