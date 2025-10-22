"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("../../common");
const user_repository_1 = require("./../../DB/repository/user.repository");
const otp_repository_1 = require("./../../DB/repository/otp.repository");
const token_service_1 = require("../../common/service/token.service");
let AuthenticationService = class AuthenticationService {
    userRepository;
    OtpRepository;
    securityService;
    tokenService;
    users = [];
    constructor(userRepository, OtpRepository, securityService, tokenService) {
        this.userRepository = userRepository;
        this.OtpRepository = OtpRepository;
        this.securityService = securityService;
        this.tokenService = tokenService;
    }
    async createConfirmEmailOtp(userId) {
        await this.OtpRepository.create({
            data: [
                { code: (0, common_2.createNumericalOtp)(), expiredAt: new Date(Date.now() + 2 * 60 * 1000),
                    createdBy: userId,
                    type: common_2.OtpEnum.ConfirmEmail
                },
            ],
        });
    }
    async signup(data) {
        const { email, password, username } = data;
        const checkUserExist = await this.userRepository.findOne({
            filter: { email },
        });
        if (checkUserExist) {
            throw new common_1.ConflictException('Email already exists');
        }
        const [user] = await this.userRepository.create({
            data: [{ username, email, password }],
        });
        if (!user) {
            throw new common_1.BadRequestException('Fail to signup this account please try again ');
        }
        await this.createConfirmEmailOtp(user._id);
        return 'Done';
    }
    async resendConfirmEmail(data) {
        const { email } = data;
        const user = await this.userRepository.findOne({
            filter: { email, confirmEmail: { $exists: false } },
            options: {
                populate: [{ path: "otp", match: { type: common_2.OtpEnum.ConfirmEmail } }]
            }
        });
        if (!user) {
            throw new common_1.NotFoundException('Fail to find matching account');
        }
        if (user.otp?.length) {
            throw new common_1.ConflictException(`Sorry we can't grand you new OTP until the existing one become expired please try again after: ${user.otp[0].expiredAt}`);
        }
        await this.createConfirmEmailOtp(user._id);
        return 'Done';
    }
    async confirmEmail(data) {
        const { email, code } = data;
        const user = await this.userRepository.findOne({
            filter: { email, confirmEmail: { $exists: false } },
            options: {
                populate: [{ path: "otp", match: { type: common_2.OtpEnum.ConfirmEmail } }]
            }
        });
        if (!user) {
            throw new common_1.NotFoundException('Fail to find matching account');
        }
        if (!(user.otp?.length && await this.securityService.compareHash(code, user.otp[0].code))) {
            throw new common_1.BadRequestException("invalid OTP ");
        }
        user.confirmEmail = new Date();
        await user.save();
        await this.OtpRepository.deleteOne({ filter: { _id: user.otp[0]._id } });
        return 'Done';
    }
    async login(data) {
        const { email, password } = data;
        const user = await this.userRepository.findOne({
            filter: { email, confirmEmail: { $exists: true }, provider: common_2.ProviderEnum.SYSTEM },
        });
        if (!user) {
            throw new common_1.NotFoundException('Fail to find matching account');
        }
        if (!(await this.securityService.compareHash(password, user.password))) {
            throw new common_1.NotFoundException('Fail to find matching account');
        }
        return await this.tokenService.createLoginCredentials(user);
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        otp_repository_1.OtpRepository,
        common_2.SecurityService,
        token_service_1.TokenService])
], AuthenticationService);
//# sourceMappingURL=auth.service.js.map