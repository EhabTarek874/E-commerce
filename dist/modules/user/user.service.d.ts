import { UserDocument } from "src/DB";
import { S3service } from './../../common/service/s3.service';
export declare class UserService {
    private readonly s3service;
    constructor(s3service: S3service);
    profile(): {
        message: string;
    };
    profileImage(file: Express.Multer.File, user: UserDocument): Promise<UserDocument>;
}
