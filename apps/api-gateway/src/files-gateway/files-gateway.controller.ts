import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FilesGatewayService } from './files-gateway.service';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';

@Controller('files')
export class FilesGatewayController {
  constructor(private readonly filesGatewayService: FilesGatewayService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.filesGatewayService.uploadFile(file);
  }
}
