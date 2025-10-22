import { DatabaseRepository } from "./database.repository";
import { Otp, OtpDocument as TDocument } from "../model";
import { Model } from "mongoose";
export declare class OtpRepository extends DatabaseRepository<Otp> {
    protected readonly model: Model<TDocument>;
    constructor(model: Model<TDocument>);
}
