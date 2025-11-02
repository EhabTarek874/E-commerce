import { Injectable } from "@nestjs/common";
import { IUser, StorageEnum } from "src/common";
import { UserDocument } from "src/DB";
import { S3service } from './../../common/service/s3.service';


@Injectable()
export class UserService {
    constructor(private readonly s3service: S3service) { }


    profile() {
        return { message: "done" }
    }




    async profileImage(file: Express.Multer.File, user: UserDocument): Promise<UserDocument> {
        user.profilePicture = await this.s3service.uploadFile({ file, storageApproach:StorageEnum.disk ,path: `user/${user._id.toString()}` })
        await user.save();
        return user;

    }

}