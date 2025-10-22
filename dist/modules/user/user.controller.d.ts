import { UserService } from './user.service';
import type { UserDocument } from 'src/DB';
import { Observable } from 'rxjs';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    profile(header: any, user: UserDocument): Observable<any>;
}
