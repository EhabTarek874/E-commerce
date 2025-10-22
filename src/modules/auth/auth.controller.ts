import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpException,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthenticationService } from './auth.service';
import { ConfirmEmailDto, LoginBodyDto, ResendConfirmEmailDto, SignupDto, SignupQueryDto } from './dto/signup.dto';
import { LoginCredentialsResponse } from 'src/common';
import { LoginResponse } from './entities/auth.entity';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}



  @Post('signup')
  // @Redirect('/',301)
  signup(
    @Body()
    body: SignupDto,
  ): {
    message: string;
  } {
    this.authenticationService.signup(body);
    return { message: 'Done' };
  }

  

  @Post('resend-confirm-email')
  // @Redirect('/',301)
  resendConfirmEmail(
    @Body()
    body: ResendConfirmEmailDto,
  ): {
    message: string;
  } {
    this.authenticationService.resendConfirmEmail(body);
    return { message: 'Done' };
  }



    @Patch('confirm-email')
  // @Redirect('/',301)
  ConfirmEmail(
    @Body()
    body: ConfirmEmailDto,
  ): {
    message: string;
  } {
    this.authenticationService.confirmEmail(body);
    return { message: 'Done' };
  }



  @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginBodyDto):Promise<LoginResponse> {
    const credentials = await this.authenticationService.login(body)
    return {message:"Done", data:{credentials}}
  }
}
