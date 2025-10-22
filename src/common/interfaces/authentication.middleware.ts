import { BadRequestException } from '@nestjs/common';
import type { Response, NextFunction } from 'express';
import { IAuthRequest } from './token.interface';

export const PreAuth = async (req: IAuthRequest, res: Response, next: NextFunction) => {
  if (req.headers.authorization?.split(" ")?.length !== 2) {
    throw new BadRequestException("Missing authorization key");
  }
  next();
};