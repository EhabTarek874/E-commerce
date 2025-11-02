"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3service = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const enums_1 = require("../enums");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const crypto_1 = require("crypto");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const fs_1 = require("fs");
let S3service = class S3service {
    s3Client;
    constructor() {
        this.s3Client = new client_s3_1.S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }
    uploadFile = async ({ storageApproach = enums_1.StorageEnum.memory, Bucket = process.env.AWS_BUCKET_NAME, ACL = "private", path = "general", file, }) => {
        console.log({
            originalname: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            bufferLength: file.buffer?.length,
            hasPath: !!file.path,
            path: file.path,
            storageApproach,
        });
        let fileContent;
        if (storageApproach === enums_1.StorageEnum.disk && file.path) {
            fileContent = (0, fs_1.createReadStream)(file.path);
            console.log("Using disk storage (file path)");
        }
        else if (storageApproach === enums_1.StorageEnum.memory && file.buffer) {
            fileContent = file.buffer;
            console.log("Using memory storage (buffer)");
        }
        else if (file.buffer) {
            fileContent = file.buffer;
            console.log("Fallback: Using buffer");
        }
        else if (file.path) {
            fileContent = (0, fs_1.createReadStream)(file.path);
            console.log("Fallback: Using file path");
        }
        else {
            throw new common_1.BadRequestException("No file content available (neither buffer nor path)");
        }
        const key = `${process.env.APPLICATION_NAME}/${path}/${(0, crypto_1.randomUUID)()}_${file.originalname}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket,
            Key: key,
            Body: fileContent,
            ACL,
            ContentType: file.mimetype,
        });
        try {
            const result = await this.s3Client.send(command);
            console.log("Upload successful:", result);
            if (storageApproach === enums_1.StorageEnum.disk && file.path) {
                const fs = require('fs').promises;
                try {
                    await fs.unlink(file.path);
                    console.log("Temporary file deleted:", file.path);
                }
                catch (unlinkError) {
                    console.warn("Could not delete temp file:", unlinkError);
                }
            }
            if (!command.input.Key) {
                throw new common_1.BadRequestException("Fail To Generate Upload Key");
            }
            return command.input.Key;
        }
        catch (error) {
            console.error("S3 Upload Error:", error);
            throw new common_1.BadRequestException(`Upload failed: ${error.message}`);
        }
    };
    uploadFiles = async ({ storageApproach = enums_1.StorageEnum.memory, Bucket = process.env.AWS_BUCKET_NAME, ACL = "private", path = "general", files, useLarge = false, }) => {
        if (!files || files.length === 0) {
            throw new common_1.BadRequestException("No files provided");
        }
        const urls = await Promise.all(files.map((file) => useLarge
            ? this.uploadLargeFile({
                storageApproach,
                Bucket,
                ACL,
                path,
                file,
            })
            : this.uploadFile({
                storageApproach,
                Bucket,
                ACL,
                path,
                file,
            })));
        return urls;
    };
    uploadLargeFile = async ({ storageApproach = enums_1.StorageEnum.memory, Bucket = process.env.AWS_BUCKET_NAME, ACL = "private", path = "general", file, }) => {
        let fileContent;
        if (file.buffer) {
            fileContent = file.buffer;
        }
        else if (file.path) {
            fileContent = (0, fs_1.createReadStream)(file.path);
        }
        else {
            throw new common_1.BadRequestException("No file content available");
        }
        const upload = new lib_storage_1.Upload({
            client: this.s3Client,
            params: {
                Bucket,
                Key: `${process.env.APPLICATION_NAME}/${path}/${(0, crypto_1.randomUUID)()}_${file.originalname}`,
                Body: fileContent,
                ACL,
                ContentType: file.mimetype,
            },
        });
        upload.on("httpUploadProgress", (progress) => {
            console.log(`upload File progress is ::::`, progress);
        });
        try {
            const { Key } = await upload.done();
            if (!Key) {
                throw new common_1.BadRequestException("Fail To Generate Upload Key");
            }
            return Key;
        }
        catch (error) {
            console.error("Upload error:", error);
            throw new common_1.BadRequestException(`Upload failed: ${error}`);
        }
    };
    createPreSignedUploadLink = async ({ Bucket = process.env.AWS_BUCKET_NAME, key, expiresIn = Number(process.env.AWS_PRE_SIGNED_URL_EXPIRES_IN_SECOND), download = "false", filename, }) => {
        const command = new client_s3_1.GetObjectCommand({
            Bucket,
            Key: key,
            ResponseContentDisposition: download === "true"
                ? `attachment; filename="${filename || key?.split("/").pop()}"`
                : undefined,
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn });
        if (!url) {
            throw new common_1.BadRequestException("Fail To Create Pre signed url");
        }
        return url;
    };
    getFile = async ({ Bucket = process.env.AWS_BUCKET_NAME, Key, }) => {
        const command = new client_s3_1.GetObjectCommand({
            Bucket,
            Key,
        });
        return await this.s3Client.send(command);
    };
    deleteFile = async ({ Bucket = process.env.AWS_BUCKET_NAME, Key }) => {
        const command = new client_s3_1.DeleteObjectCommand({
            Bucket,
            Key,
        });
        return await this.s3Client.send(command);
    };
    deleteFiles = async ({ Bucket = process.env.AWS_BUCKET_NAME, urls, Quiet = false, }) => {
        const objects = urls.map((url) => ({
            Key: url,
        }));
        const command = new client_s3_1.DeleteObjectsCommand({
            Bucket,
            Delete: {
                Objects: objects,
                Quiet,
            },
        });
        return await this.s3Client.send(command);
    };
    listDirectoryFiles = async ({ Bucket = process.env.AWS_BUCKET_NAME, path }) => {
        const command = new client_s3_1.ListObjectsV2Command({
            Bucket,
            Prefix: `${process.env.APPLICATION_NAME}/${path}`,
        });
        return await this.s3Client.send(command);
    };
};
exports.S3service = S3service;
exports.S3service = S3service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], S3service);
//# sourceMappingURL=s3.service.js.map