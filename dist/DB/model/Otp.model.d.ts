import { HydratedDocument, Types } from "mongoose";
import { OtpEnum, IOtb } from "src/common";
export declare class Otp implements IOtb {
    code: string;
    expiredAt: Date;
    createdBy: Types.ObjectId;
    type: OtpEnum;
}
export type OtpDocument = HydratedDocument<Otp>;
export declare const OtpModel: import("@nestjs/common").DynamicModule;
