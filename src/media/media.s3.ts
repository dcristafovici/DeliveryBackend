import { PutObjectCommandInput, S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import sharp from 'sharp';

export const S3Client = new S3({
  endpoint: 'https://fra1.digitaloceanspaces.com',
  credentials: {
    accessKeyId: process.env.OCEAN_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.OCEAN_S3_SECRET_ACCESS_KEY,
  },
  region: 'us-east-1',
});

export const bucketParams = (
  Key: string,
  Body: string | ReadableStream<any> | Blob | Uint8Array | Buffer,
) => ({
  Bucket: 'delivery-media',
  Key: Key,
  ACL: 'public-read',
  Body,
});

export const parallelUploads3 = (bucketParams: PutObjectCommandInput): any => {
  return new Upload({
    client: S3Client,
    queueSize: 4, // optional concurrency configuration
    leavePartsOnError: false, // optional manually handle dropped parts
    params: bucketParams,
  });
};

export const sharpFunction = (path: string, width: number) => {
  return sharp(path).resize({ width }).toBuffer();
};
