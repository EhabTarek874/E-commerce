import { DeleteObjectCommand, DeleteObjectCommandOutput, DeleteObjectsCommand, DeleteObjectsCommandOutput, GetObjectCommand, ListObjectsV2Command, ObjectCannedACL, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { StorageEnum } from '../enums';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';
import { Upload } from '@aws-sdk/lib-storage';
import { createReadStream } from 'fs';

@Injectable()
export class S3service {
  private s3Client: S3Client;
  constructor() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION as string,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      },
    });
  }

  
uploadFile = async ({
  storageApproach = StorageEnum.memory,
  Bucket = process.env.AWS_BUCKET_NAME,
  ACL = "private",
  path = "general",
  file,
}: {
  storageApproach?: StorageEnum.memory | StorageEnum.disk;
  Bucket?: string;
  ACL?: ObjectCannedACL;
  path?: string;
  file: Express.Multer.File;
}): Promise<string> => {
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

  if (storageApproach === StorageEnum.disk && file.path) {
    fileContent = createReadStream(file.path);
    console.log("Using disk storage (file path)");
  } else if (storageApproach === StorageEnum.memory && file.buffer) {
    fileContent = file.buffer;
    console.log("Using memory storage (buffer)");
  } else if (file.buffer) {
    fileContent = file.buffer;
    console.log("Fallback: Using buffer");
  } else if (file.path) {
    fileContent = createReadStream(file.path);
    console.log("Fallback: Using file path");
  } else {
    throw new BadRequestException(
      "No file content available (neither buffer nor path)"
    );
  }

  const key = `${process.env.APPLICATION_NAME}/${path}/${randomUUID()}_${file.originalname}`;

  const command = new PutObjectCommand({
    Bucket,
    Key: key,
    Body: fileContent,
    ACL,
    ContentType: file.mimetype,
  });

  try {
    const result = await this.s3Client.send(command);
    console.log("Upload successful:", result);

    if (storageApproach === StorageEnum.disk && file.path) {
      const fs = require('fs').promises;
      try {
        await fs.unlink(file.path);
        console.log("Temporary file deleted:", file.path);
      } catch (unlinkError) {
        console.warn("Could not delete temp file:", unlinkError);
      }
    }

    if (!command.input.Key) {
      throw new BadRequestException("Fail To Generate Upload Key");
    }

    return command.input.Key;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new BadRequestException(`Upload failed: ${error.message}`);
  }
};



 uploadFiles = async ({
  storageApproach = StorageEnum.memory,
  Bucket = process.env.AWS_BUCKET_NAME as string,
  ACL = "private",
  path = "general",
  files,
  useLarge = false,
}: {
  storageApproach?: StorageEnum.memory;
  Bucket?: string;
  ACL?: ObjectCannedACL;
  path?: string;
  files: Express.Multer.File[];
  useLarge?: boolean;
}): Promise<string[]> => {
  if (!files || files.length === 0) {
    throw new BadRequestException("No files provided");
  }

  const urls: string[] = await Promise.all(
    files.map((file) =>
      useLarge
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
          })
    )
  );

  return urls;
};

 uploadLargeFile = async ({
  storageApproach = StorageEnum.memory,
  Bucket = process.env.AWS_BUCKET_NAME,
  ACL = "private",
  path = "general",
  file,
}: {
  storageApproach?: StorageEnum.memory;
  Bucket?: string;
  ACL?: ObjectCannedACL;
  path?: string;
  file: Express.Multer.File;
}): Promise<string> => {
  let fileContent;

  if (file.buffer) {
    fileContent = file.buffer;
  } else if (file.path) {
    fileContent = createReadStream(file.path);
  } else {
    throw new BadRequestException("No file content available");
  }

  const upload = new Upload({
    client: this.s3Client,
    params: {
      Bucket,
      Key: `${process.env.APPLICATION_NAME}/${path}/${randomUUID()}_${
        file.originalname
      }`,
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
      throw new BadRequestException("Fail To Generate Upload Key");
    }
    return Key;
  } catch (error) {
    console.error("Upload error:", error);
    throw new BadRequestException(`Upload failed: ${error}`);
  }
};












createPreSignedUploadLink = async ({
  Bucket = process.env.AWS_BUCKET_NAME as string,
  key,
  expiresIn = Number(process.env.AWS_PRE_SIGNED_URL_EXPIRES_IN_SECOND),
  download = "false",
  filename,
}: {
  Bucket?: string;
  key: string;
  expiresIn?: number;
  download?: 'true' | 'false' | undefined;
  filename?: string| undefined;
}): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket,
    Key: key, // ✅ استخدم key هنا
    ResponseContentDisposition:
      download === "true"
        ? `attachment; filename="${filename || key?.split("/").pop()}"`
        : undefined,
  });
  
  const url = await getSignedUrl(this.s3Client, command, { expiresIn });
  
  if (!url) {
    throw new BadRequestException("Fail To Create Pre signed url");
  }
  
  return url;
};


















 getFile = async ({
  Bucket = process.env.AWS_BUCKET_NAME as string,
  Key,
}: {
  Bucket?: string;
  Key: string;
}) => {
  const command = new GetObjectCommand({
    Bucket,
    Key,
  });
  return await this.s3Client.send(command)
};



 deleteFile  = async({
  Bucket=process.env.AWS_BUCKET_NAME as string,
  Key
}:{
  Bucket?:string,
  Key:string
}):Promise<DeleteObjectCommandOutput> =>{
  
  const command = new DeleteObjectCommand({
    Bucket,
    Key,
  })
  return await this.s3Client.send(command)
}



deleteFiles = async ({
  Bucket = process.env.AWS_BUCKET_NAME as string,
  urls,
  Quiet = false,
}: {
  Bucket?: string;
  urls: string[];
  Quiet?: boolean;
}): Promise<DeleteObjectsCommandOutput> => {
  const objects = urls.map((url) => ({
    Key: url,
  }));

  const command = new DeleteObjectsCommand({
    Bucket,
    Delete: {
      Objects: objects,
      Quiet,
    },
  });

  return await this.s3Client.send(command);
};


 listDirectoryFiles = async({Bucket= process.env.AWS_BUCKET_NAME as string, path}:{Bucket?:string, path:string}) =>{

  const command = new ListObjectsV2Command({
    Bucket,
    Prefix:`${process.env.APPLICATION_NAME}/${path}`,

  })

  return await this.s3Client.send(command)
}


}
