import { UserService } from './user.service';
import type { UserDocument } from 'src/DB';
import type { IMulter, IResponse } from '../../common';
import { profileResponse } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    profileImage(user: UserDocument, file: Express.Multer.File): Promise<IResponse<profileResponse>>;
    coverImage(files: Array<IMulter>): {
        message: string;
        files: IMulter[];
    };
    image(files: {
        profileImage: Array<IMulter>;
        coverImage: Array<IMulter>;
    }): {
        message: string;
        files: {
            profileImage: Array<IMulter>;
            coverImage: Array<IMulter>;
        };
    };
}
