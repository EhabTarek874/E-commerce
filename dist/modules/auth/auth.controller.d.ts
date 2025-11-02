import { AuthenticationService } from './auth.service';
import { ConfirmEmailDto, LoginBodyDto, ResendConfirmEmailDto, SignupDto } from './dto/signup.dto';
import { IResponse } from 'src/common';
import { LoginResponse } from './entities/auth.entity';
export declare class AuthenticationController {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    signup(body: SignupDto): Promise<IResponse>;
    resendConfirmEmail(body: ResendConfirmEmailDto): Promise<IResponse>;
    ConfirmEmail(body: ConfirmEmailDto): Promise<IResponse>;
    login(body: LoginBodyDto): Promise<IResponse<LoginResponse>>;
}
