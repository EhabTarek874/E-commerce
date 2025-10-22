import { HydratedDocument, Types } from "mongoose";
import { OtpEnum } from "src/common";
export declare class Otp {
    code: string;
    expiredAt: Date;
    createdBy: Types.ObjectId;
    type: OtpEnum;
}
export type OtpDocument = HydratedDocument<Otp>;
export declare const OtpModel: import("@nestjs/common").DynamicModule;
