import { rpcBadRequest } from '@app/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

type SerializedBuffer =
  | Buffer
  | {
      type: 'Buffer';
      data: number[];
    };

type UploadedFilePayload = {
  fieldname?: string;
  originalname: string;
  encoding?: string;
  mimetype: string;
  size?: number;
  buffer: SerializedBuffer;
};

@Injectable()
export class FileServiceService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly region: string;
  private readonly publicBaseUrl: string;
  private readonly endpoint: string;

  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.get<string>('AWS_REGION', 'us-east-1');
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET', '');
    this.publicBaseUrl = this.configService.get<string>(
      'AWS_S3_PUBLIC_BASE_URL',
      '',
    );
    this.endpoint = this.configService.get<string>('AWS_S3_ENDPOINT', '');

    this.s3Client = new S3Client({
      region: this.region,
      endpoint: this.endpoint,
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID', ''),
        secretAccessKey: this.configService.get<string>(
          'AWS_SECRET_ACCESS_KEY',
          '',
        ),
      },
      forcePathStyle: false,
    });

    console.log(this.region);
    console.log(this.bucketName);
    console.log(this.publicBaseUrl);
    console.log(this.endpoint);
  }

  async uploadImage(file: UploadedFilePayload, folder = 'attendance') {
    try {
      if (!file) {
        throw rpcBadRequest('File is required');
      }

      const fileBuffer = this.normalizeBuffer(file.buffer);

      if (!fileBuffer.length) {
        throw rpcBadRequest('Uploaded file buffer is empty');
      }

      const extension = this.getFileExtension(file.originalname);
      const safeName = `${folder}/${Date.now()}-${randomUUID()}.${extension}`;

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: safeName,
          Body: fileBuffer,
          ContentType: file.mimetype,
          ACL: 'public-read',
        }),
      );

      const url = this.publicBaseUrl
        ? `${this.publicBaseUrl}/${safeName}`
        : `${this.endpoint}/${this.bucketName}/${safeName}`;

      return {
        key: safeName,
        url,
      };
    } catch (error) {
      console.error('S3 upload error:', error);
      throw new InternalServerErrorException('Failed to upload image to S3');
    }
  }

  private normalizeBuffer(buffer: SerializedBuffer): Buffer {
    if (Buffer.isBuffer(buffer)) {
      return buffer;
    }

    if (
      buffer &&
      typeof buffer === 'object' &&
      buffer.type === 'Buffer' &&
      Array.isArray(buffer.data)
    ) {
      return Buffer.from(buffer.data);
    }

    throw rpcBadRequest(
      'Uploaded file buffer is invalid or missing after microservice serialization.',
    );
  }

  private getFileExtension(filename: string): string {
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop()!.toLowerCase() : 'jpg';
  }
}
