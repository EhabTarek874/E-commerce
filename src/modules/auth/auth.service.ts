import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { createNumericalOtp,  IUser, LoginCredentialsResponse, OtpEnum, ProviderEnum, SecurityService } from 'src/common';
import { ConfirmEmailDto, LoginBodyDto, ResendConfirmEmailDto, SignupDto } from './dto/signup.dto';
import { UserRepository } from './../../DB/repository/user.repository';
import { OtpRepository } from './../../DB/repository/otp.repository';
import { sign } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/service/token.service';
import { UserDocument } from 'src/DB';

@Injectable()
export class AuthenticationService {
  private users: IUser[] = [];
  constructor(
    private readonly userRepository: UserRepository,
    private readonly OtpRepository: OtpRepository,
    private readonly securityService:SecurityService,
    private readonly tokenService:TokenService,
  ) {}

  private async createConfirmEmailOtp(userId:Types.ObjectId){
    await this.OtpRepository.create({
      data: [
        { code: createNumericalOtp(), expiredAt: new Date(Date.now() + 2 * 60 * 1000),
            createdBy:userId,
            type:OtpEnum.ConfirmEmail
         },
      ],
    });
  }
  async signup(data: SignupDto): Promise<string> {
    const { email, password, username } = data;
    const checkUserExist = await this.userRepository.findOne({
      filter: { email },
    });
    if (checkUserExist) {
      throw new ConflictException('Email already exists');
    }
    const [user] = await this.userRepository.create({
      data: [{ username, email, password }],
    });
    if (!user) {
      throw new BadRequestException(
        'Fail to signup this account please try again ',
      );
    }
    
    await this.createConfirmEmailOtp(user._id)
    return 'Done';
  }




  async resendConfirmEmail(data: ResendConfirmEmailDto): Promise<string> {
    const { email } = data;
    const user = await this.userRepository.findOne({
      filter: { email, confirmEmail:{$exists: false} },
      options:{
        populate:[{path:"otp" , match:{type:OtpEnum.ConfirmEmail}}]
      }
    });
    if (!user) {
      throw new NotFoundException('Fail to find matching account');
    }
    
    if (user.otp?.length) {
      throw new ConflictException(`Sorry we can't grand you new OTP until the existing one become expired please try again after: ${user.otp[0].expiredAt}`)
    }

    await this.createConfirmEmailOtp(user._id)
    return 'Done';
  }



  async confirmEmail(data: ConfirmEmailDto): Promise<string> {
    const { email, code  } = data;
    const user = await this.userRepository.findOne({
      filter: { email, confirmEmail:{$exists: false} },
      options:{
        populate:[{path:"otp" , match:{type:OtpEnum.ConfirmEmail}}]
      }
    });
    if (!user) {
      throw new NotFoundException('Fail to find matching account');
    }
    
    if (!(user.otp?.length && await this.securityService.compareHash(code, user.otp[0].code))) {
      throw new BadRequestException("invalid OTP ")
    }

    user.confirmEmail = new Date();
    await user.save();
    await this.OtpRepository.deleteOne({filter:{_id: user.otp[0]._id}})
    return 'Done';
  }





 async login(data: LoginBodyDto): Promise<LoginCredentialsResponse> {
    const { email, password } = data;
    const user = await this.userRepository.findOne({
      filter: { email, confirmEmail:{$exists:true}, provider:ProviderEnum.SYSTEM},
    });
    if (!user) {
      throw new NotFoundException('Fail to find matching account');
    }
    if (!(await this.securityService.compareHash(password, user.password))) {
      throw new NotFoundException('Fail to find matching account')
    }

    return await this.tokenService.createLoginCredentials(user as UserDocument)
    
  }


}




