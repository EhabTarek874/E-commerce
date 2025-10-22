import { DatabaseRepository } from "./database.repository";
import { Model } from "mongoose";
import { Token, TokenDocument } from "../model";
export declare class TokenRepository extends DatabaseRepository<Token> {
    protected readonly model: Model<TokenDocument>;
    constructor(model: Model<TokenDocument>);
}
