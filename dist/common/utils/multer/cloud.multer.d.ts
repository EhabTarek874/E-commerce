import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { StorageEnum } from 'src/common/enums';
export declare const cloudFileUpload: ({ storageApproach, validation, fileSize, }: {
    storageApproach?: StorageEnum;
    validation: string[];
    fileSize?: number;
}) => MulterOptions;
