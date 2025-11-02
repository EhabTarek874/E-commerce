import {
  Controller,
  Get,
  Headers,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RoleEnum, StorageEnum, successResponse, User } from 'src/common';
import { Auth } from 'src/common/decorators/auth.decorator';
import type { UserDocument } from 'src/DB';
import { PreferredLanguageInterceptor } from 'src/common/interceptors';
import { delay, Observable, of } from 'rxjs';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { cloudFileUpload, fileValidation, localFileUpload } from 'src/common/utils/multer';
import type { IMulter, IResponse, IUser } from '../../common';
import { profileResponse } from './entities/user.entity';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}



  @UseInterceptors(
    FileInterceptor(
      'profileImage',
      cloudFileUpload({
        storageApproach:StorageEnum.disk,
        validation: fileValidation.image,
        fileSize: 2,
      }),
    ),
  )
  @Auth([RoleEnum.user])
  @Patch('profile-image')
 async profileImage(
    @User() user:UserDocument,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 })],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File ,
  ):Promise<IResponse<profileResponse>> {
   const profile = await this.userService.profileImage(file, user)
    return successResponse<profileResponse>({ data: { profile } });
  }




  @UseInterceptors(
    AnyFilesInterceptor(
      localFileUpload({
        folder: 'User',
        validation: fileValidation.image,
        fileSize: 2,
      }),
    ),
  )
  @Auth([RoleEnum.user])
  @Patch('cover-image')
  coverImage(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 })],
        fileIsRequired: true,
      }),
    )
    files: Array<IMulter>,
  ) {
    return { message: 'Done', files };
  }





  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'profileImage', maxCount: 1 },
        { name: 'coverImages', maxCount: 2 },
      ],
      localFileUpload({
        folder: 'User',
        validation: fileValidation.image,
        fileSize: 2,
      }),
    ),
  )
  @Auth([RoleEnum.user])
  @Patch('image')
  image(
    @UploadedFiles(
      new ParseFilePipe({
        // validators: [new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 })],
        fileIsRequired: true,
      }),
    )
    files: {profileImage:Array<IMulter> ; coverImage:Array<IMulter>},
  ) {
    return { message: 'Done', files };
  }
}
