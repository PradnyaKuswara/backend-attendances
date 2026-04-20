import { Controller } from '@nestjs/common';
import { FileServiceService } from './file-service.service';
import { Payload, MessagePattern } from '@nestjs/microservices';
import { successResponse } from '@app/common';

@Controller()
export class FileServiceController {
  constructor(private readonly fileServiceService: FileServiceService) {}

  @MessagePattern({ cmd: 'file_upload' })
  async uploadFile(@Payload() file: Express.Multer.File) {
    const res = await this.fileServiceService.uploadImage(file);
    return successResponse({
      data: res,
      message: 'File uploaded successfully',
    });
  }
}
