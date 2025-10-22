import { Global, Module } from '@nestjs/common';
import {
  TokenModel,
  TokenRepository,
  UserModel,
  UserRepository,
} from 'src/DB';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/common/service/token.service';

@Global()
@Module({
  imports: [UserModel, TokenModel],
  providers: [
    UserRepository,
    JwtService,
    TokenService,
    TokenRepository,
  ],
  controllers: [],
  exports: [
    TokenService,
    UserRepository,
    JwtService,
    TokenRepository,
    TokenModel,
    UserModel,
  ],
})
export class SharedAuthenticationModule {}
