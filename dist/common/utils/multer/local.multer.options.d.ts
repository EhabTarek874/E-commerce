import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
export declare const localFileUpload: ({ folder, validation, fileSize, }: {
    folder?: string;
    validation: string[];
    fileSize?: number;
}) => MulterOptions;
