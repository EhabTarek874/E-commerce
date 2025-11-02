import { BadRequestException, Controller, Get, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticationService } from './modules/auth/auth.service';
import { S3service } from './common/service/s3.service';
import type{ Response } from 'express';
import { promisify } from 'node:util';
import { pipeline } from 'node:stream';
//localhost:3000/
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly s3service:S3service) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


    @Get('hi')
  sayHi(): string {
    return "Hi";
  }



  @Get('/upload/pre-signed/*path')
  async getPresignedAssetUrl(
    @Query() query : {download?:"true"; filename?:string},
    @Param() params : {path:string[]},
  ){
    const { download, filename } = query;
    const {path} = params;
    const key = path.join("/");
    const url = await this.s3service.createPreSignedUploadLink({ key ,download,filename,});

    return ({message:"Done", data:{url}})
  }




@Get('/upload/*path')
async getAsset(
  @Query() query: { download?: 'true' | 'false'; filename?: string },
  @Param() params: { path: string[] },
  @Res({ passthrough: true }) res: Response,
) {
  const { download, filename } = query;
  const { path } = params;
  const Key = path.join('/');
  const s3Response = await this.s3service.getFile({ Key });
  // console.log(s3Response);
  
  if (!s3Response?.Body) {
    throw new BadRequestException('Fail to fetch this asset');
  }

  res.set('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Content-Type', `${s3Response.ContentType}`);

  if (download === 'true') {
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${filename || Key.split('/').pop()}"`,
    ); // only apply it for download
  }

  return await s3Response.Body.transformToByteArray();
}
}
