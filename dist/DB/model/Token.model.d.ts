import { HydratedDocument, Types } from "mongoose";
import { IToken } from "src/common";
export declare class Token implements IToken {
    jti: string;
    expiredAt: Date;
    createdBy: Types.ObjectId;
}
export type TokenDocument = HydratedDocument<Token>;
export declare const TokenModel: import("@nestjs/common").DynamicModule;
