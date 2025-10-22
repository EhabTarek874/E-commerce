import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthenticationModule } from '../auth/auth.module';
import { PreAuth } from 'src/common/interfaces/authentication.middleware';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService],
  exports: [],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PreAuth)
      .forRoutes(UserController);
  }



}
