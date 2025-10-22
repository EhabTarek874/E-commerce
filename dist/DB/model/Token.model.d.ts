import { HydratedDocument, Types } from "mongoose";
export declare class Token {
    jti: string;
    expiredAt: Date;
    createdBy: Types.ObjectId;
}
export type TokenDocument = HydratedDocument<Token>;
export declare const TokenModel: import("@nestjs/common").DynamicModule;
