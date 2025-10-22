import { LoginCredentialsResponse, SecurityService } from 'src/common';
import { ConfirmEmailDto, LoginBodyDto, ResendConfirmEmailDto, SignupDto } from './dto/signup.dto';
import { UserRepository } from './../../DB/repository/user.repository';
import { OtpRepository } from './../../DB/repository/otp.repository';
import { TokenService } from 'src/common/service/token.service';
export declare class AuthenticationService {
    private readonly userRepository;
    private readonly OtpRepository;
    private readonly securityService;
    private readonly tokenService;
    private users;
    constructor(userRepository: UserRepository, OtpRepository: OtpRepository, securityService: SecurityService, tokenService: TokenService);
    private createConfirmEmailOtp;
    signup(data: SignupDto): Promise<string>;
    resendConfirmEmail(data: ResendConfirmEmailDto): Promise<string>;
    confirmEmail(data: ConfirmEmailDto): Promise<string>;
    login(data: LoginBodyDto): Promise<LoginCredentialsResponse>;
}
