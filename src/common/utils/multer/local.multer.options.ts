import { diskStorage } from 'multer';
import type { Request } from 'express';
import { randomUUID } from 'crypto';
import path from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { IMulter } from './../../interfaces/multer.interface';
import { BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

export const localFileUpload = ({
  folder = 'public',
  validation = [],
  fileSize = 2,
}: {
  folder?: string;
  validation: string[];
  fileSize?: number;
}):MulterOptions => {
  let bathPath = `uploads/${folder}`;
  return {
    storage: diskStorage({
      destination(req: Request, file: IMulter, callback: Function) {
        const fullPath = path.resolve(`./${bathPath}`);
        if (!existsSync(fullPath)) {
          mkdirSync(fullPath, { recursive: true });
        }
        callback(null, fullPath);
      },

      filename(req: Request, file: IMulter, callback: Function) {
        const fileName =
          randomUUID() + '_' + Date.now() + '_' + file.originalname;
        file.finalPath = bathPath + `/${fileName}`;
        callback(null, fileName);
      },
    }),

    fileFilter(req: Request, file: Express.Multer.File, callback: Function) {
      if (validation.includes(file.mimetype)) {
        return callback(null, true);
      }
      return callback(new BadRequestException('Invalid file format'));
    },

    limits: {
      fileSize: fileSize * 1024 * 1024,
    },
  };
};
