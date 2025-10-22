import type { Response, NextFunction } from 'express';
import { IAuthRequest } from './token.interface';
export declare const PreAuth: (req: IAuthRequest, res: Response, next: NextFunction) => Promise<void>;
