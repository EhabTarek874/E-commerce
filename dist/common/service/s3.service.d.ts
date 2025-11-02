import { DeleteObjectCommandOutput, DeleteObjectsCommandOutput, ObjectCannedACL } from '@aws-sdk/client-s3';
import { StorageEnum } from '../enums';
export declare class S3service {
    private s3Client;
    constructor();
    uploadFile: ({ storageApproach, Bucket, ACL, path, file, }: {
        storageApproach?: StorageEnum.memory | StorageEnum.disk;
        Bucket?: string;
        ACL?: ObjectCannedACL;
        path?: string;
        file: Express.Multer.File;
    }) => Promise<string>;
    uploadFiles: ({ storageApproach, Bucket, ACL, path, files, useLarge, }: {
        storageApproach?: StorageEnum.memory;
        Bucket?: string;
        ACL?: ObjectCannedACL;
        path?: string;
        files: Express.Multer.File[];
        useLarge?: boolean;
    }) => Promise<string[]>;
    uploadLargeFile: ({ storageApproach, Bucket, ACL, path, file, }: {
        storageApproach?: StorageEnum.memory;
        Bucket?: string;
        ACL?: ObjectCannedACL;
        path?: string;
        file: Express.Multer.File;
    }) => Promise<string>;
    createPreSignedUploadLink: ({ Bucket, key, expiresIn, download, filename, }: {
        Bucket?: string;
        key: string;
        expiresIn?: number;
        download?: "true" | "false" | undefined;
        filename?: string | undefined;
    }) => Promise<string>;
    getFile: ({ Bucket, Key, }: {
        Bucket?: string;
        Key: string;
    }) => Promise<import("@aws-sdk/client-s3").GetObjectCommandOutput>;
    deleteFile: ({ Bucket, Key }: {
        Bucket?: string;
        Key: string;
    }) => Promise<DeleteObjectCommandOutput>;
    deleteFiles: ({ Bucket, urls, Quiet, }: {
        Bucket?: string;
        urls: string[];
        Quiet?: boolean;
    }) => Promise<DeleteObjectsCommandOutput>;
    listDirectoryFiles: ({ Bucket, path }: {
        Bucket?: string;
        path: string;
    }) => Promise<import("@aws-sdk/client-s3").ListObjectsV2CommandOutput>;
}
