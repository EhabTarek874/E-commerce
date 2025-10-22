import { DatabaseRepository } from "./database.repository";
import { UserDocument as TDocument, User } from "../model";
import { Model } from "mongoose";
export declare class UserRepository extends DatabaseRepository<User> {
    protected readonly model: Model<TDocument>;
    constructor(model: Model<TDocument>);
}
