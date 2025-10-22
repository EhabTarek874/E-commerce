import { HydratedDocument } from "mongoose";
import { GenderEnum, LanguageEnum, ProviderEnum, RoleEnum } from "src/common/enums";
import { OtpDocument } from "./Otp.model";
export declare class User {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    confirmEmail: Date;
    password: string;
    provider: ProviderEnum;
    role: RoleEnum;
    gender: GenderEnum;
    preferredLanguage: LanguageEnum;
    changeCredentialsTime: Date;
    otp: OtpDocument[];
}
export type UserDocument = HydratedDocument<User>;
export declare const UserModel: import("@nestjs/common").DynamicModule;
