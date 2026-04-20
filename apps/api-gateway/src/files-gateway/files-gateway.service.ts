import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { handleRpcError } from 'apps/api-gateway/helpers/helper';

@Injectable()
export class FilesGatewayService {
  constructor(
    @Inject('FILE_SERVICE') private readonly fileClient: ClientProxy,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    try {
      return await firstValueFrom(
        this.fileClient.send<unknown, Express.Multer.File>(
          { cmd: 'file_upload' },
          file,
        ),
      );
    } catch (error: unknown) {
      handleRpcError(error);
    }
  }
}
