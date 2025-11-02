import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { S3service, SharedAuthenticationModule } from './common';
import { BrandModule } from './modules/brand/brand.module';
import { CategoryModule } from './modules/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath:resolve('./config/.env.development'), isGlobal:true}),
    MongooseModule.forRoot(process.env.DB_URI as string, {serverSelectionTimeoutMS:30000}),
    SharedAuthenticationModule,
    AuthenticationModule,
    BrandModule,
    CategoryModule,
    UserModule
  ],
  controllers: [AppController, ],
  providers: [AppService, S3service],
})
export class AppModule {}
