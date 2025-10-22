import { AuthenticationService } from './auth.service';
import { ConfirmEmailDto, LoginBodyDto, ResendConfirmEmailDto, SignupDto } from './dto/signup.dto';
import { LoginResponse } from './entities/auth.entity';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    signup(body: SignupDto): {
        message: string;
    };
    resendConfirmEmail(body: ResendConfirmEmailDto): {
        message: string;
    };
    ConfirmEmail(body: ConfirmEmailDto): {
        message: string;
    };
    login(body: LoginBodyDto): Promise<LoginResponse>;
}
