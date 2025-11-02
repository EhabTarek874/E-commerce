import {
  Body,
  Controller,
  HttpCode,
  Patch,
  Post,

} from '@nestjs/common';
import { AuthenticationService } from './auth.service';
import { ConfirmEmailDto, LoginBodyDto, ResendConfirmEmailDto, SignupDto, SignupQueryDto } from './dto/signup.dto';
import { IResponse, successResponse } from 'src/common';
import { LoginResponse } from './entities/auth.entity';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) { }



  @Post('signup')
  // @Redirect('/',301)
  async signup(
    @Body()
    body: SignupDto,
  ): Promise<IResponse> {
    await this.authenticationService.signup(body);
    return successResponse()
  }



  @Post('resend-confirm-email')
  // @Redirect('/',301)
  async resendConfirmEmail(
    @Body()
    body: ResendConfirmEmailDto,
  ): Promise<IResponse> {
    await this.authenticationService.resendConfirmEmail(body);
    return successResponse()
  }



  @Patch('confirm-email')
  // @Redirect('/',301)
  async ConfirmEmail(
    @Body()
    body: ConfirmEmailDto,
  ): Promise<IResponse> {
    await this.authenticationService.confirmEmail(body);
    return successResponse()
  }



  @HttpCode(200)
  @Post('login')
  async login(@Body() body: LoginBodyDto): Promise<IResponse<LoginResponse>> {
    const credentials = await this.authenticationService.login(body)
    return successResponse<LoginResponse>({ message: "Done", data: { credentials } })
  }
}
