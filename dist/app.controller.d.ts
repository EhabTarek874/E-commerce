import { AppService } from './app.service';
import { S3service } from './common/service/s3.service';
import type { Response } from 'express';
export declare class AppController {
    private readonly appService;
    private readonly s3service;
    constructor(appService: AppService, s3service: S3service);
    getHello(): string;
    sayHi(): string;
    getPresignedAssetUrl(query: {
        download?: "true";
        filename?: string;
    }, params: {
        path: string[];
    }): Promise<{
        message: string;
        data: {
            url: string;
        };
    }>;
    getAsset(query: {
        download?: 'true' | 'false';
        filename?: string;
    }, params: {
        path: string[];
    }, res: Response): Promise<Uint8Array<ArrayBufferLike>>;
}
